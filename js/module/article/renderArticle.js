import {createMarkup} from './createArticle.js';


export const
    renderBlog = (selectorApp) => {
        const data = createMarkup();
        const rendered = document.querySelector(`${selectorApp}`);
        rendered.append(data.main);
        return data;
    };

