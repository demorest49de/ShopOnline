export const loadItemsHandler = ($) => {

    const loadArticle = async (search, callback) => {
        const result = await fetch(`https://gorest.co.in/public-api/posts/${search.id}`);
        const data = await result.json();

        const userId = callback(data);
        return userId;
    };

    const getUser = async (id, callback) => {
        const result = await fetch(`https://gorest.co.in/public-api/users/${id}`);
        const data = await result.json();

        callback(data);
    };

    const updateArticle = (data) => {
        const apiData = data.data;
        $.breadCrumbsTitle.textContent = apiData.title;
        $.title.textContent = apiData.title;
        document.title = apiData.title;
        $.text.textContent = apiData.body;

        return apiData.user_id;
    };

    const updateUser = (data) => {
        const api =  data.data;
        console.log(' : ',data.data);
        $.author.textContent = api.name;
    };

    const getSearchParams = () => {
        const paramsString = window.location.search;
        const searchParams = new URLSearchParams(paramsString);
        const paramsObject = Object.fromEntries(searchParams);
        return paramsObject;
    };

    const searchObject = getSearchParams();
    const id = loadArticle(searchObject, updateArticle);

    id.then(id => {
        console.log(' : ', id);
        getUser(id, updateUser);
    });


};