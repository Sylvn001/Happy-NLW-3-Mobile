import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

export default {

    async index(request: Request, response: Response){
        const ophanagesRepository = getRepository(Orphanage)
        const orphanages = await ophanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages))

    },

    async show(request: Request, response: Response){
        const {id} = request.params;

        const ophanagesRepository = getRepository(Orphanage)
        const orphanages = await ophanagesRepository.findOneOrFail(id , {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanages))

    },

    async create(request: Request, response: Response){


        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
    
        } = request.body;
    
        const ophanagesRepository = getRepository(Orphanage)
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return {path: image.filename}
        })

        
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends == 'true',
            images
        }

        const Schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await Schema.validate(data, {
            abortEarly: false,
        })

        

        const orphanage = ophanagesRepository.create(data)
    
        await ophanagesRepository.save(orphanage);
    
        return response.status(201).json({orphanage})
    }
};