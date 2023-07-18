import { Movies } from './moviesType';

export type Response = {
    page: number;
    results: Movies[] | Movies;
    total_pages: number;
    total_results: number;
};

export type OneMovie = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: object;
    budget: number;
    genres: object[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: object[];
    production_countries: object[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: object[];
    status: string;
    tagline: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};
