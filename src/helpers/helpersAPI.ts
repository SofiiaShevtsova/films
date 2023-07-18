import { OneMovie, Response } from '../types/responseType';

export const apiRequest = (url: string): Promise<Response | OneMovie> =>
    fetch(url, { method: 'GET' })
        .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
        .then((data) => data)
        .catch((error) => {
            throw error;
        });
