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
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
}

export async function getProducts(product) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
}
