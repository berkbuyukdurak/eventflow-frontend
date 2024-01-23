import axios from 'axios';
import {NetworkRequestType} from "./NetworkRequestTypes";

// Define the base URL for API calls
const API_URL = process.env.REACT_APP_BASE_ENDPOINT;

// Create an axios instance for API calls
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Define a general function to send requests
const sendRequest = async (method, path, data) => {
    try {
        const url = path;

        // Use axios instance to send the request based on the method
        let response;
        switch (method) {
            case NetworkRequestType.GET:
                response = await api.get(url);
                break;
            case NetworkRequestType.POST:
                response = await api.post(url, data);
                break;
            case NetworkRequestType.PUT:
                response = await api.put(url, data);
                break;
            case NetworkRequestType.DELETE:
                response = await api.delete(url, { data });
                break;
            default:
                throw new Error(`Unsupported request type: ${method}`);
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            // If it's a bad request, extract the message to return
            if (error.response.status === 400) {
                const errorMessage = error.response.data.message || 'Bad request error';
                return { error: errorMessage };
            }
            // Rethrow other HTTP errors
            throw error.response.data;
        } else if (error.request) {
            // Handle errors where the request was made but no response was received
            throw new Error('No response received');
        } else {
            // Handle failed request setup or some other error
            throw new Error('Error setting up request');
        }
    }
};

export default sendRequest;
