import { Movies } from '../moviesInterface';

const movieCard = (movie: Movies): string => `<li
        class=''
        key=${movie.id}
      >
          <img
            src='https://image.tmdb.org/t/p/w500/${movie.poster_path}'
            alt=${movie.title || movie.name}
            class=''
          />
          <p
            class=''
          >
            ${movie.title || movie.name}
          </p>
      </li>`;

export const moviesCards = (array: Movies[]): string =>
    `<ul>${array.map((movie: Movies): string => movieCard(movie)).join('')}</ul>`;
