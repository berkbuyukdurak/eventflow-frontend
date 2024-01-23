export const API_ENDPOINTS = {
    createPresentation: {
        url: '/presentation/create',
        method: 'POST',
        requiredAuth: false
    },
    getConferenceAgenda: {
        url: '/agenda',
        method: 'GET',
        requiredAuth: false
    }
};