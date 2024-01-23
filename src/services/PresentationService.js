import sendRequest from '../network/NetworkManager';
import { API_ENDPOINTS } from '../network/ApiEndpoints';

class PresentationService {
    // Method to create a new presentation
    static async createPresentation(presentationData) {
        try {
            const response = await sendRequest(
                API_ENDPOINTS.createPresentation.method,
                API_ENDPOINTS.createPresentation.url,
                presentationData
            );

            if (response.error) {
                throw new Error(response.error);
            }

            return response.data;
        } catch (error) {
            console.error('Error creating presentation:', error);
            throw error;
        }
    }
}

export default PresentationService;