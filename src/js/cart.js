const wrap = document.createElement('div');
const ul = document.createElement('ul');
ul.classList.add('products-list');
wrap.append(ul);

const getCart = () => JSON.parse(localStorage.getItem('cart')) ?? [];
const setCart = (items) => localStorage.setItem('cart', JSON.stringify(items));

export const updateCartCounter = () => {
  document.querySelector('#cart-counter').innerText = getCart().length;
};

export const createCartButton = (slug) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');

  const isInTheCart = getCart().includes(slug);

  button.innerText = isInTheCart ? 'already in the cart' : 'Add to card';
  button.disabled = isInTheCart;

  button.addEventListener('click', () => {
    const items = getCart();
    setCart([...items, slug]);

    button.innerText = 'already in the cart';
    button.disabled = true;
    updateCartCounter();
  });

  return button;
};

const getCartItem = async (item) => {
  const data = await fetch(`https://api.storerestapi.com/products/${item}`);
  const json = await data.json();

  const {
    category, price, slug, title,
  } = json.data;

  const li = document.createElement('li');
  li.classList.add('card', 'my-4');
  li.setAttribute('data-slug', slug);

  const html = `
    <div class="card-body">
      <h4><a href="/products/${slug}" class="card-title">${title}</a></h4>
      <a href="/categories/${category.slug}" class="btn btn-outline-primary">${category.name}</a>
      <br><br>
      <span class="display-6">$${price}</span>
    </div>
  `;

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  button.innerText = 'Delete';

  button.addEventListener('click', () => {
    const items = getCart();
    setCart(items.filter((localItem) => localItem !== item));
    li.remove();
    updateCartCounter();

    if (!ul.querySelectorAll('li').length) {
      wrap.innerHTML = 'No items in the cart';
    }
  });

  li.insertAdjacentHTML('beforeend', html);
  li.append(button);
  ul.append(li);
};

const cart = () => new Promise((resolve) => {
  const items = getCart();
  const ulItems = ul.querySelectorAll('li');

  if (ulItems.length < items.length) {
    ulItems.forEach((li) => {
      const indexInItems = items.indexOf(li.dataset.slug);

      items.splice(indexInItems, 1);
    });

    items.map((item) => getCartItem(item).then(() => resolve(wrap)));
  } else {
    resolve('No items in the cart');
  }
});

export default cart;
