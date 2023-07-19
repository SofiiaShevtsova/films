import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';
import moviesService from './services/moviesApiServices';
import { moviesDomServises } from './services/moviesDomServices';
import { constants } from './constants/constants';
import { Response } from './types/responseType';

let page = 1;
let sortMovies = 'popular';

if (constants.boxForList) {
    constants.boxForList.innerHTML = '';
}

const checkLocalStorage = () => {
    const getLocalStorage: string | null = localStorage.getItem(constants.LIST_FAVORITE_MOVIES);
    if (getLocalStorage) {
        const localStorageList: number[] = JSON.parse(getLocalStorage);
        localStorage.removeItem(constants.LIST_FAVORITE_MOVIES);
        if (localStorageList) {
            localStorageList.map((item: number): Promise<void> => moviesDomServises.addFavoriteMovies(item));
        }
    }
};

const choiseFavoriteMovie = (event: Event) => {
    const currentTarget: HTMLElement = event.currentTarget as HTMLElement;
    if (currentTarget.classList.contains('favorite')) {
        moviesDomServises.removeMovieFromFavorite(+currentTarget.id);
    } else {
        moviesDomServises.addFavoriteMovies(+currentTarget.id);
    }

    currentTarget.classList.toggle('favorite');
    const favoriteIcon: NodeListOf<HTMLElement> = document.querySelectorAll('.heart');
    favoriteIcon.forEach((btn: HTMLElement): void => {
        btn.addEventListener('click', choiseFavoriteMovie);
    });
};

const getMoviesList = async (moviesType: string): Promise<void> => {
    switch (moviesType) {
        case 'popular': {
            const response: Response = await moviesService.getPopularFilms(page);
            const { results } = response;
            moviesDomServises.setMoviesList(results);
            sortMovies = 'popular';
            break;
        }
        case 'upcoming': {
            const response: Response = await moviesService.getUpcomingFilms(page);
            const { results } = response;
            moviesDomServises.setMoviesList(results);
            sortMovies = 'upcoming';
            break;
        }
        case 'top_rated': {
            const response: Response = await moviesService.getHighestRatedFilms(page);
            const { results } = response;
            moviesDomServises.setMoviesList(results);
            sortMovies = 'top_rated';
            break;
        }

        default: {
            const response: Response = await moviesService.getFilmByName(sortMovies, page);
            const { results } = response;
            moviesDomServises.setMoviesList(results);
        }
    }
    const favoriteIcon: NodeListOf<HTMLElement> = document.querySelectorAll('.heart');
    favoriteIcon.forEach((btn: HTMLElement): void => {
        btn.addEventListener('click', choiseFavoriteMovie);
    });
};

const searchMovieByName = async (event: Event) => {
    event.preventDefault();
    if (constants.formForSearch) {
        const input: HTMLInputElement | null = constants.formForSearch.querySelector('input');
        const query = input ? input.value.trim() : sortMovies;
        page = 1;
        sortMovies = query;
        if (constants.boxForList) {
            constants.boxForList.innerHTML = '';
        }
        constants.formForSearch.reset();
        getMoviesList(query);
    }
};

const changeMoviesListSort = async (event: Event) => {
    page = 1;
    if (constants.boxForList) {
        constants.boxForList.innerHTML = '';
    }

    const target: HTMLElement = event.target as HTMLElement;

    if (target.id) {
        getMoviesList(target.id);
    }
};

const onBtnLoadMoreClick = () => {
    page += 1;
    getMoviesList(sortMovies);
};

checkLocalStorage();

getMoviesList(sortMovies);

constants.boxForRadioBtn?.addEventListener('click', changeMoviesListSort);
constants.formForSearch?.addEventListener('submit', searchMovieByName);
constants.btnLoadMore?.addEventListener('click', onBtnLoadMoreClick);
