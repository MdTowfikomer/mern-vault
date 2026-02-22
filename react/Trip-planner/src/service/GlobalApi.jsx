import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/search/photos';

export const getPlaceDetails = (query) => axios.get(BASE_URL, {
    params: {
        client_id: import.meta.env.VITE_UNSPLASH_PLACE_API_KEY,
        query: query
    }
});   