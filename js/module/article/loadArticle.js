
export const loadItemsHandler = ($) => {

    const loadArticle = async (one, callback) => {
        console.log(' : ',one);
        const result = await fetch(`https://gorest.co.in/public-api/posts?page=1&per_page=12`);
        const data = await result.json();

        callback(data);
    };

    const updateArticle = (data) => {

        const paramsString = window.location.search;
        var searchParams = new URLSearchParams(paramsString);

        for (const param of searchParams) {
            console.log(' : ',param);
        }
    };
    const one = 1;
    loadArticle(one, updateArticle);
};