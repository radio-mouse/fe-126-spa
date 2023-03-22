import initRouter from './router';
import { updateCartCounter } from './cart';

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  updateCartCounter();
});
