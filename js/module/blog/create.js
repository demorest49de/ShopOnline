const fulfillPagination = (pagination) => {

    pagination.innerHTML = `
        <svg class="pagination__left-arrow" xmlns="http://www.w3.org/2000/svg"><use href="./img/blog/arrows.svg#left"></use></svg>
        <svg class="pagination__right-arrow" xmlns="http://www.w3.org/2000/svg"><use href="./img/blog/arrows.svg#right"></use></svg>
    `;
    const leftArrow = document.createElement('svg');
    leftArrow.classList.add('pagination__left-arrow');
    leftArrow.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const useLeftArrow = document.createElement('use');
    useLeftArrow.setAttribute('href',`./img/blog/arrows.svg#left`);
    leftArrow.append(useLeftArrow);

    const rightArrow = document.createElement('svg');
    rightArrow.classList.add('pagination__right-arrow');
    rightArrow.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const useRightArrow = document.createElement('use');
    useRightArrow.setAttribute('href',`./img/blog/arrows.svg#right`);
    rightArrow.append(useRightArrow);

    pagination.append(leftArrow, rightArrow);
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
    fulfillPagination(pagination);
    container.append(blogList, pagination);
    return {main, blogList, blogPagination: pagination};
};