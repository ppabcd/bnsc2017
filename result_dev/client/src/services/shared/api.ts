import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:8000/api',
    timeout: 2000
};

export default axios.create(config);
