const main: HTMLElement | null = document.querySelector('main');

interface Constants {
    boxForRandomMovie: HTMLElement | null;
    boxForList: HTMLElement | null | undefined;
    boxForFavoriteMovies: HTMLElement | null;
    boxForRadioBtn: HTMLElement | null;
    formForSearch: HTMLFormElement | null | undefined;
    btnLoadMore: HTMLElement | null;
    LIST_FAVORITE_MOVIES: string;
}

export const constants: Constants = {
    boxForRandomMovie: document.querySelector('#random-movie'),
    boxForList: main?.querySelector('.container'),
    boxForFavoriteMovies: document.querySelector('#favorite-movies'),
    boxForRadioBtn: document.querySelector('#button-wrapper'),
    formForSearch: main?.querySelector('form'),
    btnLoadMore: document.querySelector('#load-more'),

    LIST_FAVORITE_MOVIES: 'list-favorite-movies',
};
