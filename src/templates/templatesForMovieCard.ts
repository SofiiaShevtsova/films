import { MoviesForApp } from '../types/moviesType';

const checkFavorite = (id: number, favoriteList: number[]): boolean => favoriteList.includes(id);

const movieCard = (movie: MoviesForApp, favoriteList: number[]): string =>
    `<li class="col-lg-3 col-md-4 col-12 p-2" key=${movie.id}>` +
    `<div class="card shadow-sm">` +
    `<img src='https://image.tmdb.org/t/p/w500/${movie.posterPath}' alt=${movie.title || movie.name}>` +
    `<svg xmlns="http://www.w3.org/2000/svg" stroke="red" width="50" height="50" id="${
        movie.id
    }" class="heart bi bi-heart-fill position-absolute p-2 ${
        checkFavorite(movie.id, favoriteList) && 'favorite'
    }" viewBox="0 -2 18 22">` +
    `<path fill-rule="evenodd"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>` +
    ` </svg>` +
    `<div class="card-body">` +
    ` <p class="card-text truncate">${movie.overview}</p>` +
    `<div class="d-flex justify-content-between align-items-center">` +
    `<small class="text-muted">${movie.releaseDate}</small>` +
    `</div></div></div></li>`;

export const moviesList = (array: MoviesForApp[], favoriteList: number[]): Element => {
    const list = document.createElement('ul');
    list.classList.add('row');
    list.innerHTML = array.map((movie: MoviesForApp) => movieCard(movie, favoriteList)).join(' ');
    return list;
};
