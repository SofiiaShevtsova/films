import moviesService from './moviesApiServices';
import { Movies, MoviesForApp } from '../types/moviesType';
import { showMoviesList, showFavoriteMovies } from '../helpers/showMoviesList';
import { constants } from '../constants/constants';
import { mapperArray } from '../helpers/helpersMaping';

class MoviesDomServices {
    moviesList: MoviesForApp[];

    favoriteMoviesList: MoviesForApp[];

    listForLocal: number[];

    constructor({
        moviesList,
        favoriteMoviesList,
        listForLocal,
    }: {
        moviesList: MoviesForApp[];
        favoriteMoviesList: MoviesForApp[];
        listForLocal: number[];
    }) {
        this.moviesList = moviesList;
        this.favoriteMoviesList = favoriteMoviesList;
        this.listForLocal = listForLocal;
    }

    setMoviesList(list: Movies[]): void {
        this.moviesList = mapperArray(list);
        showMoviesList(this.moviesList, this.listForLocal);
    }

    async addFavoriteMovies(movieId: number): Promise<void> {
        const response = await moviesService.getFilmById(movieId);
        const { id, title, name, overview, poster_path: posterPath, release_date: releaseDate } = response;
        this.favoriteMoviesList.push({ id, title, name, overview, posterPath, releaseDate });
        this.listForLocal.push(movieId);
        localStorage.setItem(constants.LIST_FAVORITE_MOVIES, JSON.stringify(this.listForLocal));
        showFavoriteMovies(this.favoriteMoviesList, this.listForLocal);
    }

    removeMovieFromFavorite(movieId: number): void {
        this.favoriteMoviesList = this.favoriteMoviesList.filter(
            (movie: MoviesForApp): boolean => movieId !== movie.id
        );
        this.listForLocal = this.listForLocal.filter((id: number): boolean => id !== movieId);
        localStorage.setItem(constants.LIST_FAVORITE_MOVIES, JSON.stringify(this.listForLocal));
        showFavoriteMovies(this.favoriteMoviesList, this.listForLocal);
    }
}

export const moviesDomServises = new MoviesDomServices({ moviesList: [], favoriteMoviesList: [], listForLocal: [] });
