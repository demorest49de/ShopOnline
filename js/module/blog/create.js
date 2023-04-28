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
    const blogPagination = document.createElement('div');
    blogPagination.classList.add('blog__pagination');
    container.append(blogList, blogPagination);
    return {main, blogList, blogPagination};
};