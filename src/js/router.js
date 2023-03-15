import home from './home';
import products from './products';
import categories from './categories';
import cart from './cart';

const routes = {
  '/': home,
  '/products': products,
  '/categories': categories,
  '/cart': cart,
};

const changeRoute = (route) => {
  window.history.pushState({}, '', route);
  window.dispatchEvent(new Event('popstate'));
};

const handleClick = (e) => {
  e.preventDefault();

  const route = e.target.pathname;

  if (window.location.pathname !== route) {
    changeRoute(route);
  }
};

const handleRoute = () => {
  const location = window.location.pathname;
  const route = routes[location];

  if (!route) {
    window.location.href = '/';
  }

  document.querySelectorAll('#nav-list .nav-link').forEach((el) => {
    el.classList.remove('active');

    if (el.pathname === location) {
      el.classList.add('active');
    }
  });
  document.querySelectorAll('a').forEach((el) => el.addEventListener('click', handleClick));
  document.querySelector('#content').innerHTML = route();
};

const routerInit = () => {
  handleRoute();
  window.addEventListener('popstate', () => handleRoute());
};

export default routerInit;
