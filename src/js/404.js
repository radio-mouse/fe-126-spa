const content404 = async () => {
  const p = document.createElement('p');

  p.innerHTML = 'You are able to go to the <a href="/">Home page</a>';

  return p;
};

export default content404;
