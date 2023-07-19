import { Movies, MoviesForApp } from '../types/moviesType';

export const mapperArray = (list: Movies[]): MoviesForApp[] =>
    list.map((movies: Movies): MoviesForApp => {
        const { id, title, name, overview, poster_path: posterPath, release_date: releaseDate } = movies;
        return { id, title, name, overview, posterPath, releaseDate };
    });
