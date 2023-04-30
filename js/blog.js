import {loadItemsHandler} from "./module/blog/load.js";
import {renderBlog} from './module/blog/render.js';
import {initVars} from './module/blog/initVars.js';

{
    const blogInit = (selectorApp) => {
        const data = renderBlog(selectorApp);
        console.log(' : ',data);
        const {blogPagination, main, blogList, pageLinks} = data;
        const $ = {blogPagination, main, blogList, pageLinks};
        loadItemsHandler($);
        paginationHandler($);
    };

    window.blogInit = blogInit;
}