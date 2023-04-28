export const loadItemsHandler = () => {
    const loadArticles = async (callback) => {
        const result = await fetch('https://gorest.co.in/public-api/posts?per_page=12');

        const data = await result.json();

        callback(data);
    };

    const getFormattedDate = () => {
        var dt_options = {day: `numeric`, month: `long`, year: `numeric`};
        var today = new Date();
        var strDate = today.toLocaleDateString("ru-RU", dt_options).split(" ").slice(0, -1);
        const [monthDate, monthName, yearNumber] = strDate;
        return `${monthDate} ${monthName} ${yearNumber}, `;
    };

    const getFormattedTime = () => {
        var dt_options = {hour: `2-digit`, minute: `2-digit`};
        var today = new Date();
        var strTime = today.toLocaleTimeString("ru-RU", dt_options).split(" ");
        return strTime.toString();
    };

    const renderArticles = (data) => {
        console.log(' : ', data.data);

        const articlesHTML = data.data.map((item, index) => {
            console.log(' : ', item, index);
            const strDate = getFormattedDate();
            const strTime = getFormattedTime();
            //
            const article = document.createElement('article');
            article.classList.add('blog__article', 'article');
            article.innerHTML = `
             <article class="blog__article article">
                <a class="article__link" href="article.html?id=${item.id}">
                    <figure class="article__image">
                        <img src="./img/blog/${index}.png" alt="замшевые ботинки">
                    </figure>
                    <div class="article__block">
                        <h2 class="article__subtitle">
                            ${item.title}
                        </h2>
                        <div class="article__datetime">
                            <span class="article__date">${strDate}</span>
                            <span class="article__time">${strTime}</span>
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
            console.log(' : ', article);
            return article;
        });
    };

    loadArticles(renderArticles);
};