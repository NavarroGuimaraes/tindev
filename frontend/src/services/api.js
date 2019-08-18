import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8042'
})

export default api;