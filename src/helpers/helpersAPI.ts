import { OneMovie, Response } from '../types/responseType';

export const apiRequestForList = (url: string): Promise<Response> =>
    fetch(url, { method: 'GET' })
        .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
        .then((data) => data)
        .catch((error) => {
            throw error;
        });

export const apiRequestForMovie = (url: string): Promise<OneMovie> =>
    fetch(url, { method: 'GET' })
        .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
        .then((data) => data)
        .catch((error) => {
            throw error;
        });
