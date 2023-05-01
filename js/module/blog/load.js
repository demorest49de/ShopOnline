const pageSettings = () => {
    return {
        currentPage: "",
        endPage: "",
        currentPageStr: 'currentPage',
    };
};

let {currentPage, currentPageStr, endPage} = pageSettings();

const setStorage = (key, value) => {
    localStorage.setItem(key, `${value}`);
    return value;
};

const getStorage = () => {
    currentPage = localStorage.getItem(currentPageStr);
    // console.log(' : ', Number.isInteger(currentPage), currentPage);

    currentPage = currentPage && Number.isInteger(+currentPage) ? currentPage : setStorage('1');
    // console.log(' : ', currentPage);
};

export const loadItemsHandler = ($) => {

    const loadArticles = async (callback) => {
        const result = await fetch(`https://gorest.co.in/public-api/posts?page=${currentPage}&per_page=12`);
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

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    };

    const renderArticles = (data) => {
        // console.log(' : ',data);
        endPage = data.meta.pagination.total;
        // console.log(' : ',endPage);
        const articlesHTML = data.data.map((item, index) => {

            // console.log(' : ', item);

            const strDate = getFormattedDate();
            const strTime = getFormattedTime();
            //
            const article = document.createElement('article');
            article.classList.add('blog__article', 'article');
            article.innerHTML = `
             <article class="blog__article article">
                <a class="article__link" href="article.html?id=${item.id}">
                    <figure class="article__image">
                        <img src="./img/blog/${index}.png" alt="${item.title}">
                    </figure>
                    <div class="article__block">
                        <h2 class="article__subtitle">
                            ${item.title}
                        </h2>
                        <div class="article__subblock">
                            <div class="article__datetime">
                                <span class="article__date">${strDate}</span>
                                <span class="article__time">${strTime}</span>
                            </div>
                        
                            <div class="article__views-comments">
                                <span class="article__text-block">
                                <svg class="article__icon" xmlns="http://www.w3.org/2000/svg">
                                    <use href="./img/blog/views-chat.svg#views"></use>
                                </svg>
                                    ${getRandomIntInclusive(1, 3)}.${getRandomIntInclusive(0, 9)}K</span>
                                <span class="article__text-block">
                                <svg class="article__icon" xmlns="http://www.w3.org/2000/svg">
                                    <use href="./img/blog/views-chat.svg#chat"></use>
                                </svg>
                                    ${getRandomIntInclusive(13, 200)}</span>
                            </div>
                        </div>
                    </div>
                </a>
             </article>
        `;

            return article;
        });

        $.blogList.append(...articlesHTML);
    };


    loadArticles(renderArticles);
};

export const paginationHandler = ($) => {
    $.pageElems.pageList.addEventListener('click', ({target}) => {
        currentPage = +(target.getAttribute('data-pageNumber'));
        setStorage(currentPageStr, currentPage);
        loadItemsHandler($);
    });

    const setPage = ($) => {
        getStorage();

        const nodeListOf = $.pageElems.pageList.querySelectorAll('.pagination__item');
        [...nodeListOf].forEach(element => {
            element.classList.remove('pagination__item-active');
        });

        $.pageElems.links.forEach(elem => {
            if (elem.getAttribute('data-pagenumber') === currentPage) {
                elem.parentElement.classList.add('pagination__item-active');
                return;
            }
        });
    };

    const setArrows = ($) => {
        const arrowNodes = $.blogPagination.querySelectorAll('svg');
        // console.log(' : ', arrowNodes);
        const [leftArrow, rightArrow] = arrowNodes;

        const leftLink = $.pageElems.leftLink;

        if (+currentPage !== 1) {
            leftArrow.classList.add('pagination__arrow-active');
        }

        leftLink.addEventListener('click', (ev) => {
            const target = ev.target;
            const anchor = target.closest('.pagination__link-left');
            console.log(' : ', anchor);
            if (+currentPage > 1) {
                currentPage = (+currentPage - 1);
                setStorage(currentPageStr, currentPage);
                setPage($);
                anchor.click();
            }
        });
    };

    const setArrowLink = ($) => {

        if (+currentPage > 1) {
            $.pageElems.leftLink.href = `blog.html?page=${+currentPage - 1}`;
        }
        if (+currentPage < +endPage) {
            $.pageElems.rightLink.href = `blog.html?page=${+currentPage + 1}`;
        }
    };

    setPage($);
    setArrows($);
    setArrowLink($);
};