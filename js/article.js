import {createMarkup} from './module/article/createArticle.js';

{
    const articleInit = (selectorApp) => {
        createMarkup();
    };

    window.articleInit = articleInit;
}

