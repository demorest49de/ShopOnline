import {loadItemsHandler} from "./module/blog/load.js";

{
    const blogInit = (selectorApp) => {
        loadItemsHandler();
    };

    window.blogInit = blogInit;
}