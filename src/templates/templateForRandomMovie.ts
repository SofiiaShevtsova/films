import { MoviesForApp } from '../types/moviesType';

const movieRandomCard = (movie: MoviesForApp): string =>
    `<div class="col-lg-6 col-md-8 mx-auto" style="background-color: #2525254f">` +
    `<h1 id="random-movie-name" class="fw-light text-light">${movie.title || movie.name}</h1>` +
    `<p id="random-movie-description" class="lead text-white">${movie.overview}</p>` +
    `</div>`;

export const randomMovieBox = (movie: MoviesForApp): Element => {
    const box = document.createElement('div');
    box.classList.add('row', 'py-lg-5');
    if (movie) {
        box.innerHTML = movieRandomCard(movie);
    }
    return box;
};
