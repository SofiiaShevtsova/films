import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';
import moviesService from './services/moviesServices';
import { moviesMaper } from './helpers/helpersMaping';
import { constants } from './constants/constants';
import { Response } from './types/responseType';

let page = 1;
let sortMovies = 'popular';

const checkLocalStorage = () => {
    const localStorageList = JSON.parse(localStorage.getItem(constants.LIST_FAVORITE_MOVIES));
    localStorage.removeItem(constants.LIST_FAVORITE_MOVIES);
    if (localStorageList) {
        localStorageList.map((item: number) => moviesMaper.addFavoriteMovies(+item));
    }
};

const getMoviesList = async (moviesType: string): Promise<void> => {
    switch (moviesType) {
        case 'popular': {
            const response: Response = await moviesService.getPopularFilms(page);
            const { results } = response;
            moviesMaper.setMoviesList(results);
            sortMovies = 'popular';
            break;
        }
        case 'upcoming': {
            const response: Response = await moviesService.getUpcomingFilms(page);
            const { results } = response;
            moviesMaper.setMoviesList(results);
            sortMovies = 'upcoming';
            break;
        }
        case 'top_rated': {
            const response: Response = await moviesService.getHighestRatedFilms(page);
            const { results } = response;
            moviesMaper.setMoviesList(results);
            sortMovies = 'top_rated';
            break;
        }

        default:
    }
};

const choiseFavoriteMovie = (event: EventListenerObject) => {
    if (event.currentTarget.classList.contains('favorite')) {
        moviesMaper.removeMovieFromFavorite(+event.currentTarget.id);
    } else {
        moviesMaper.addFavoriteMovies(+event.currentTarget.id);
    }

    event.currentTarget.classList.toggle('favorite');
};

const searchMovieByName = async (event: Event) => {
    event.preventDefault();
    const query = event.target?.querySelector('input').value.trim();

    const response: Response = await moviesService.getFilmByName(query);
    const { results } = response;
    moviesMaper.setMoviesList(results);
    event.target?.reset();
};

const changeMoviesListSort = async (event: Event) => {
    page = 1;
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
const favoriteIcon: NodeListOf<Element> = document.querySelectorAll('.heart');
favoriteIcon.forEach((btn: Element) => {
    btn.addEventListener('click', choiseFavoriteMovie);
});
