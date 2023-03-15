const createCategory = ({ name, slug }, index) => `
  <div class="card my-4">
    <div class="card-header">
      Category №${index + 1}
    </div>
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <a href="/categories/${slug}" class="btn btn-primary">Go to the ${name}</a>
    </div>
  </div>
`;

const categories = async () => {
  const data = await fetch('https://api.storerestapi.com/categories');
  const json = await data.json();

  return json.data.map(createCategory).join('');
};

export default categories;
