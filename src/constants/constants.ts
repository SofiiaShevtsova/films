const main: Element | null = document.querySelector('main');

interface Constants {
    boxForRandomMovie: Element | null | undefined;
    boxForList: Element | null | undefined;
    boxForFavoriteMovies: Element | null | undefined;
    boxForRadioBtn: Element | null | undefined;
    formForSearch: Element | null | undefined;
    btnLoadMore: Element | null | undefined;
    LIST_FAVORITE_MOVIES: string;
}

export const constants: Constants = {
    boxForRandomMovie: main?.querySelector('#random-movie'),
    boxForList: main?.querySelector('.container'),
    boxForFavoriteMovies: document.querySelector('#favorite-movies'),
    boxForRadioBtn: main?.querySelector('#button-wrapper'),
    formForSearch: main?.querySelector('form'),
    btnLoadMore: main?.querySelector('#load-more'),

    LIST_FAVORITE_MOVIES: 'list-favorite-movies',
};
