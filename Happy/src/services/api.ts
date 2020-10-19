import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.106:3333' // <- Example is here. if you restar the computer this url can change :D
    // You may change this http, if you are running for android emulator or ios, you can change to localhost::3333 else you can use expo url, but change 'expo:' and the port
    
})

export default api; 