import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';
import moviesService from './service/requests';

moviesService.getPopularFilms();
moviesService.getHighestRatedFilms();
moviesService.getUpcomingFilms();

// TODO render your app here
