import { Response, OneMovie } from '../types/responseType';
import { apiRequestForList, apiRequestForMovie } from '../helpers/helpersAPI';

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

    async getFilmByName(name: string): Promise<Response> {
        try {
            const query = `&query=${name}`;
            const url = `${this.#baseURL}${this.#endpointSearchByName}${this.#keyAPI}${query}`;

            const result = await apiRequestForList(url);

            return result;
        } catch (error) {
            throw new Error();
        }
    }

    async getPopularFilms(page?: number): Promise<Response> {
        try {
            const pageNumber = `page=${page || 1}&`;
            const url = `${this.#baseURL}${this.#popularEndpoint}${pageNumber}${this.#keyAPI}`;

            const result = await apiRequestForList(url);

            return result;
        } catch (error) {
            throw new Error();
        }
    }

    async getHighestRatedFilms(page?: number): Promise<Response> {
        try {
            const pageNumber = `page=${page || 1}&`;
            const url = `${this.#baseURL}${this.#highestRatedEndpoint}${pageNumber}${this.#keyAPI}`;

            const result = await apiRequestForList(url);

            return result;
        } catch (error) {
            throw new Error();
        }
    }

    async getUpcomingFilms(page?: number): Promise<Response> {
        try {
            const pageNumber = `page=${page || 1}&`;
            const url = `${this.#baseURL}${this.#upcomingMoviesEndpoint}${pageNumber}${this.#keyAPI}`;

            const result = await apiRequestForList(url);

            return result;
        } catch (error) {
            throw new Error();
        }
    }

    async getFilmById(id: number): Promise<OneMovie> {
        try {
            const url = `${this.#baseURL}movie/${id}?${this.#keyAPI}&language=en-US`;
            const result = await apiRequestForMovie(url);
            return result;
        } catch (error) {
            throw new Error();
        }
    }
}

const moviesService = new MoviesService({
    baseURL: 'https://api.themoviedb.org/3/',
    keyAPI: 'api_key=ba9af9187d823167244a35c2fd918141',
    endpointSearchByName: 'search/movie?language=en-US&include_adult=false&',
    popularEndpoint: 'discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&',
    highestRatedEndpoint:
        'discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&',
    upcomingMoviesEndpoint:
        'discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=release_date.desc&with_release_type=2|3&',
});

export default moviesService;
