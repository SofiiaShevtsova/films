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
    const localStorageList = JSON.parse(localStorage.getItem(constants.LIST_FAVORITE_MOVIES));
    localStorage.removeItem(constants.LIST_FAVORITE_MOVIES);
    if (localStorageList) {
        localStorageList.map((item: number) => moviesDomServises.addFavoriteMovies(+item));
    }
};

const choiseFavoriteMovie = (event: EventListenerObject) => {
    if (event.currentTarget.classList.contains('favorite')) {
        moviesDomServises.removeMovieFromFavorite(+event.currentTarget.id);
    } else {
        moviesDomServises.addFavoriteMovies(+event.currentTarget.id);
    }

    event.currentTarget.classList.toggle('favorite');
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
    const favoriteIcon: NodeListOf<Element> = document.querySelectorAll('.heart');
    favoriteIcon.forEach((btn: Element) => {
        btn.addEventListener('click', choiseFavoriteMovie);
    });
};

const searchMovieByName = async (event: Event) => {
    event.preventDefault();
    const query = event.target?.querySelector('input').value.trim();
    page = 1;
    sortMovies = query;
    if (constants.boxForList) {
        constants.boxForList.innerHTML = '';
    }
    event.target?.reset();
    getMoviesList(query);
};

const changeMoviesListSort = async (event: Event) => {
    page = 1;
    if (constants.boxForList) {
        constants.boxForList.innerHTML = '';
    }

    if (event.target?.id) {
        getMoviesList(event.target?.id);
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
