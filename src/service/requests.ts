import { Movies } from '../moviesInterface';

class MoviesService {
    #baseURL: string;

    #keyAPI: string;

    #popularEndpoint: string;

    #endpointSearchByName: string;

    #highestRatedEndpoint: string;

    #upcomingMoviesEndpoint: string;

    constructor({
        baseURL,
        keyAPI,
        popularEndpoint,
        endpointSearchByName,
        highestRatedEndpoint,
        upcomingMoviesEndpoint,
    }: {
        baseURL: string;
        keyAPI: string;
        popularEndpoint: string;
        endpointSearchByName: string;
        highestRatedEndpoint: string;
        upcomingMoviesEndpoint: string;
    }) {
        this.#baseURL = baseURL;
        this.#keyAPI = keyAPI;
        this.#popularEndpoint = popularEndpoint;
        this.#endpointSearchByName = endpointSearchByName;
        this.#highestRatedEndpoint = highestRatedEndpoint;
        this.#upcomingMoviesEndpoint = upcomingMoviesEndpoint;
    }

    async getFilmByName(name: string): Promise<Movies[]> {
        const query = `&query=${name}`;
        const url = `${this.#baseURL}${this.#endpointSearchByName}${this.#keyAPI}${query}`;

        const result = await fetch(url, { method: 'GET' })
            .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
            .then((data) => data)
            .catch((error) => {
                throw error;
            });

        return result;
    }

    async getPopularFilms(): Promise<Movies[]> {
        const url = `${this.#baseURL}${this.#popularEndpoint}${this.#keyAPI}`;

        const result = await fetch(url, { method: 'GET' })
            .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
            .then((data) => data)
            .catch((error) => {
                throw error;
            });

        return result;
    }

    async getHighestRatedFilms(): Promise<Movies[]> {
        const url = `${this.#baseURL}${this.#highestRatedEndpoint}${this.#keyAPI}`;

        const result = await fetch(url, { method: 'GET' })
            .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
            .then((data) => data)
            .catch((error) => {
                throw error;
            });

        return result;
    }

    async getUpcomingFilms(): Promise<Movies[]> {
        const url = `${this.#baseURL}${this.#upcomingMoviesEndpoint}${this.#keyAPI}`;

        const result = await fetch(url, { method: 'GET' })
            .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
            .then((data) => data)
            .catch((error) => {
                throw error;
            });

        return result;
    }

    async getFilmById(id: number): Promise<Movies> {
        const url = `${this.#baseURL}movie/${id}?${this.#keyAPI}&language=en-US`;

        const result = await fetch(url, { method: 'GET' })
            .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
            .then((data) => data)
            .catch((error) => {
                throw error;
            });

        return result;
    }

    // async getCastByFilm(id) {
    //     try {
    //         const response = await axios.get(`${baseUrl}movie/${id}/credits?${keyAPI}&language=en-US`);
    //         const { data } = response;
    //         return data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async getReviewsFilm(id) {
    //     try {
    //         const response = await axios.get(`${baseUrl}movie/${id}/reviews?${keyAPI}&language=en-US`);
    //         const { data } = response;
    //         return data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

const moviesService = new MoviesService({
    baseURL: 'https://api.themoviedb.org/3/',
    keyAPI: 'api_key=ba9af9187d823167244a35c2fd918141',
    endpointSearchByName: 'search/movie?language=en-US&include_adult=false&',
    popularEndpoint:
        'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&',
    highestRatedEndpoint:
        'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&',
    upcomingMoviesEndpoint:
        'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&',
});

export default moviesService;
