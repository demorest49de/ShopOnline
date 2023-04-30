const createPageLink = (pagination) => {

    const pages = document.createElement('nav');
    pages.classList.add('pagination__navigation');
    pages.ariaLabel = `pagination`;
    pages.insertAdjacentHTML(`beforeend`,
        `
            <ul class="pagination__list">
                 <li class="pagination__item"><a class="pagination__link" href="#">1</a></li>
                 <li class="pagination__item"><a class="pagination__link" href="#">2</a></li>
                 <li class="pagination__item"><a class="pagination__link" href="#">3</a></li>
             </ul>
        `);
    pagination.append(pages);
    const links = pages.querySelectorAll('.pagination__item .pagination__link');
    const pageList = pages.querySelector('.pagination__list');
    return {links: links, pageList: pageList};
};

const addPagination = (pagination) => {

    pagination.insertAdjacentHTML('afterbegin',
        `
        <svg class="pagination__left-arrow" xmlns="http://www.w3.org/2000/svg"><use href="./img/blog/arrows.svg#left"></use></svg>

        `
    );

    const pageElems = createPageLink(pagination);

    pagination.insertAdjacentHTML('beforeend',
        `
            <svg class="pagination__right-arrow" xmlns="http://www.w3.org/2000/svg"><use href="./img/blog/arrows.svg#right"></use></svg>
        `
    );
    return pageElems;
};

export const createMain = () => {
    const main = document.createElement('main');
    const section = document.createElement('section');
    section.classList.add('blog');
    section.ariaLabel = `блог`;
    main.append(section);
    const h1 = document.createElement('h1');
    h1.classList.add(`blog__title`, `visually-hidden`);
    section.append(h1);
    const container = document.createElement('div');
    container.classList.add('container', 'blog__container');
    section.append(container);
    const blogList = document.createElement('div');
    blogList.classList.add('blog__list');
    const pagination = document.createElement('div');
    pagination.classList.add('blog__pagination', `pagination`);
    const pageElems = addPagination(pagination);
    container.append(blogList, pagination);
    return {main, blogList, blogPagination: pagination, pageElems};
};