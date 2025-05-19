import axios from 'axios';

const BASE_URL = `https://api.themoviedb.org/3/`;

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export default axiosInstance;


