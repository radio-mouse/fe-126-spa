import { createCartButton } from './cart';

const productDetail = async () => {
  const data = await fetch(`https://api.storerestapi.com/products/${window.location.pathname.split('/')[2]}`);
  const json = await data.json();

  const {
    category, createdBy, price, title, slug,
  } = json.data;

  document.querySelector('h1').innerText = title;

  const wrap = document.createElement('div');

  const html = `
    <a href="/categories/${category.slug}" class="btn btn-outline-primary">${category.name}</a>
    <br><br>
    <p>By ${createdBy.name}</p>
    <span class="display-6">$${price}</span>
    <br><br>
  `;

  wrap.insertAdjacentHTML('afterbegin', html);
  wrap.append(createCartButton(slug));

  return wrap;
};

export default productDetail;
