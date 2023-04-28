export const loadItemsHandler = () => {
    const loadArticles = async (callback) => {
        const result = await fetch('https://gorest.co.in/public-api/posts?per_page=12');

        const data = await result.json();

        callback(data);
    };

    const renderArticles = (data) => {
        console.log(' : ', data.data);

        const articlesHTML = data.data.map((item, index) => {
            console.log(' : ',item, index);
            //
            const article = document.createElement('article');
            article.classList.add('blog__article', 'article');
            article.innerHTML = `
             <article class="blog__article article">
                <a class="article__link">
                    <figure class="article__image">
                        <img src="./img/blog/${index}.png" alt="замшевые ботинки">
                    </figure>
                    <div class="article__block">
                        <h2 class="article__subtitle">
                            ${item.title}
                        </h2>
                        <div class="article__datetime">
                            <span class="article__date">22 октября 2021, </span>
                            <span class="article__time">12:45</span>
                        </div>
                        <div class="article__views-comments">
                            <span class="article__subblock">
                            <svg class="article__icon" xmlns="http://www.w3.org/2000/svg">
                                <use href="./img/blog/views-chat.svg#views"></use>
                            </svg>
                                1.2K</span>
                            <span class="article__subblock">
                            <svg class="article__icon" xmlns="http://www.w3.org/2000/svg">
                                <use href="./img/blog/views-chat.svg#chat"></use>
                            </svg>
                                0</span>
                        </div>
                    </div>
                </a>
             </article>
        `;
            console.log(' : ',article);
            return article;
        });
    };

    loadArticles(renderArticles);
};