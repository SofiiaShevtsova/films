import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';
import moviesService from './services/moviesServices';
import { moviesMaper } from './helpers/helpersMaping';
import { constants } from './constants/constants';
import { Response } from './types/responseType';

function checkLocalStorage() {
    const localStorageList = JSON.parse(localStorage.getItem(constants.LIST_FAVORITE_MOVIES));
    localStorage.removeItem(constants.LIST_FAVORITE_MOVIES);
    if (localStorageList) {
        localStorageList.map((item: number) => moviesMaper.addFavoriteMovies(+item));
    }
}
checkLocalStorage();

const popularList: Response = await moviesService.getPopularFilms();
const { results: list } = popularList;
moviesMaper.setMoviesList(list);

const favoriteIcon: NodeListOf<Element> = document.querySelectorAll('.heart');

favoriteIcon.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('favorite')) {
            moviesMaper.removeMovieFromFavorite(+e.currentTarget.id);
        } else {
            moviesMaper.addFavoriteMovies(+e.currentTarget.id);
        }

        e.currentTarget.classList.toggle('favorite');
    });
});

const searchMovieByName = async (event: Event) => {
    event.preventDefault();
    const query = event.target?.querySelector('input').value.trim();

    const response: Response = await moviesService.getFilmByName(query);
    const { results } = response;
    moviesMaper.setMoviesList(results);
    event.target?.reset();
};

const changeMoviesList = async (event: Event) => {
    if (event.target?.id) {
        switch (event.target.id) {
            case 'popular': {
                const response: Response = await moviesService.getPopularFilms();
                const { results } = response;
                moviesMaper.setMoviesList(results);
                break;
            }
            case 'upcoming': {
                const response: Response = await moviesService.getUpcomingFilms();
                const { results } = response;
                moviesMaper.setMoviesList(results);
                break;
            }
            case 'top_rated': {
                const response: Response = await moviesService.getHighestRatedFilms();
                const { results } = response;
                moviesMaper.setMoviesList(results);
                break;
            }

            default:
        }
    }
};

constants.boxForRadioBtn?.addEventListener('click', changeMoviesList);
constants.formForSearch?.addEventListener('submit', searchMovieByName);
