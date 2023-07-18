export type Movies = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MoviesForApp = {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    posterPath: string;
    releaseDate: string;
};
