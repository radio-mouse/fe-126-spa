import home from './home';
import products from './products';
import categories from './categories';
import cart from './cart';
import about from './about';

const routes = {
  '/': {
    title: 'Welcome To Our SPA Shop',
    content: home,
  },
  '/products': {
    title: 'Check Out Our Products',
    content: products,
  },
  '/categories': {
    title: 'All Categories Are Here',
    content: categories,
  },
  '/about': {
    title: "Here's information about our store",
    content: about,
  },
  '/cart': {
    title: 'Your products',
    content: cart,
  },
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

  const { title, content } = route;

  document.querySelectorAll('#nav-list .nav-link').forEach((el) => {
    el.classList.remove('active');

    if (el.pathname === location) {
      el.classList.add('active');
    }
  });
  document.querySelector('h1').innerHTML = title;
  document.querySelector('#content').innerHTML = content();
  document.querySelectorAll('a').forEach((el) => el.addEventListener('click', handleClick));
};

const routerInit = () => {
  handleRoute();
  window.addEventListener('popstate', () => handleRoute());
};

export default routerInit;
