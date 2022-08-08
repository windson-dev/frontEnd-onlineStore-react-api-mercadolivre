export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function getProducts(product) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function getCategoriesFromID(category) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${category}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function getProductsID(id) { // api para os detalhes
  const url = `https://api.mercadolibre.com/items/${id}`;
  const data = await fetch(url);
  const object = await data.json();
  return object;
}
