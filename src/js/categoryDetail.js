import { createCard } from './products';

const categoryDetail = async () => {
  const data = await fetch(`https://api.storerestapi.com/categories/${window.location.pathname.split('/')[2]}`);
  const json = await data.json();

  const { name, products } = json.data;

  document.querySelector('h1').innerText = name;

  const wrap = document.createElement('div');

  const ul = document.createElement('ul');
  ul.classList.add('products-list');

  products.map((el) => ul.append(createCard(el)));

  wrap.append(ul);

  return wrap;
};

export default categoryDetail;
