import { constants } from '../constants/constants';
import { MoviesForApp } from '../types/moviesType';
import { moviesList } from '../templates/templatesForMovieCard';
import { randomMovieBox } from '../templates/templateForRandomMovie';

const randomFilm = (array: MoviesForApp[]): MoviesForApp => array[Math.floor(Math.random() * array.length)];

export const showMoviesList = (list: MoviesForApp[], favoriteList: number[]): void => {
    if (constants.boxForList) {
        constants.boxForList.innerHTML = '';
        constants.boxForList.prepend(moviesList(list, favoriteList));
        if (constants.boxForRandomMovie) {
            constants.boxForRandomMovie.innerHTML = '';
            constants.boxForRandomMovie.prepend(randomMovieBox(randomFilm(list)));
        }
    }
};

export const showFavoriteMovies = (list: MoviesForApp[], favoriteList: number[]) => {
    if (constants.boxForFavoriteMovies) {
        constants.boxForFavoriteMovies.innerHTML = '';
        constants.boxForFavoriteMovies.prepend(moviesList(list, favoriteList));
    }
};
