import {loadItemsHandler} from "./module/blog/load.js";
import {renderBlog} from './module/blog/render.js';
import {initVars} from './module/blog/initVars.js';

{
    const blogInit = (selectorApp) => {
        const data = renderBlog(selectorApp);
        const {blogPagination, main, blogList} = data;
        const $ = {blogPagination, main, blogList};
        loadItemsHandler($);
    };

    window.blogInit = blogInit;
}