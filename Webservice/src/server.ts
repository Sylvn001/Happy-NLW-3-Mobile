import express from 'express';
import 'express-async-errors'
import './database/connection';
import cors from 'cors'
import path from 'path'
import routes from './routes';
import errorHandler from './errors/handler'

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)
app.listen(3333)



//-------------------------------   \\ Anotations // ------------------------
//MVC 
//Model 
//Views
//Controller


//rota -> conjunto
//recurso -> usuario
//metodos HTTP -> get, post, put, delete
//parametros

// Query Params: http//localhost:3333/rota?search=juniro ->Enviar um recurso
// Route Params: http://localhost:3333/users/1 -> Indentificar um recurso
//body: enviar dados especificos, geralmente de usuarios, cadastros e informacoes sigilosas, etc

//get -> Busca de informacoes 
//Post -> criando uma informacao nova 
//Put -> Editar, atualizar
// Delete -> Apagar uma informacao

//type urm 

//driver nativo, query builder, orm
