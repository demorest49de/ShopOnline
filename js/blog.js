import {loadItemsHandler, paginationHandler} from "./module/blog/load.js";
import {renderBlog} from './module/blog/render.js';


{
    const blogInit = (selectorApp) => {
        const data = renderBlog(selectorApp);
        console.log(' : ', data);
        const {blogPagination, main, blogList, pageElems} = data;
        // const {links, pageList} = pageElems;
        // console.log(' : ',links);
        const $ = {blogPagination, main, blogList, pageElems};
        loadItemsHandler($);
        paginationHandler($);
    };

    window.blogInit = blogInit;
}