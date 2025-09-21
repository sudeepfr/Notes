import axios from 'axios';

const api=axios.create({
    baseURL:import.meta.env.BASE_URL,
    withCredentials:true //allow cookies to be sent
})

export default api;