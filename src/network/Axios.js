import axios from 'axios';
import { errorMessages } from './ErrorMessages';


const BASE_URL = process.env.REACT_APP_BASE_ENDPOINT;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

export default api;