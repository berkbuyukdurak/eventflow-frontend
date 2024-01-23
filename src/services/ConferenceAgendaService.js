import sendRequest from '../network/NetworkManager';
import { API_ENDPOINTS } from '../network/ApiEndpoints';

class ConferenceAgendaService {
    // Method to create a new presentation
    static async getConferenceAgenda() {
        try {
            const response = await sendRequest(
                API_ENDPOINTS.getConferenceAgenda.method,
                API_ENDPOINTS.getConferenceAgenda.url
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

export default ConferenceAgendaService;