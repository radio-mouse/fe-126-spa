import { loaderHtml } from './constants';

const wrap = document.createElement('div');
const ul = document.createElement('ul');
ul.classList.add('products-list');
wrap.append(ul);

// eslint-disable-next-line no-unused-vars
export const createCartButton = (slug) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.innerText = 'Add to card';

  return button;
};

const createCard = ({
  title, createdBy, price, slug,
}) => {
  const li = document.createElement('li');
  li.classList.add('card');

  const body = document.createElement('div');
  body.classList.add('card-body');

  const html = `
    <div class="card-content">
      <a class="card-title" href="/products/${slug}">
        <h5 class="card-title">${title}</h5>
      </a>
      <p class="card-text">
        By ${createdBy.name}
        <b>${price}</b>
      </p>
    </div>
  `;

  body.insertAdjacentHTML('afterbegin', html);
  body.append(createCartButton(slug));
  li.append(body);

  return li;
};

const update = async (page) => {
  wrap.insertAdjacentHTML('beforeend', loaderHtml);

  const data = await fetch(`https://api.storerestapi.com/products?limit=4&page=${page}`);
  const json = await data.json();
  const { nextPage } = json.metadata;

  wrap.querySelector('#loader').remove();
  json.data.map((el) => ul.append(createCard(el)));

  if (nextPage) {
    // eslint-disable-next-line no-use-before-define
    wrap.append(createLoadButton(json.metadata.nextPage));
  }
};

const createLoadButton = (page) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-dark', 'centered', 'my-4', 'load-more');
  button.innerText = 'Load More';

  button.addEventListener('click', () => {
    update(page);
    button.remove();
  });

  return button;
};

const products = async () => {
  if (!ul.querySelectorAll('li').length) {
    await update(1);
  }

  return wrap;
};

export default products;
