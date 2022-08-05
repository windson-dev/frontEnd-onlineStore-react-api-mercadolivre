import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: '',
      productsButton: [],
    };
  }

  async componentDidMount() {
    const result = await getCategories();
    this.setState({
      categories: result,
    });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.name]: value,
    });
  }

  handleClick = async () => {
    const { products, productsButton } = this.state;
    const result = await getProductsFromCategoryAndQuery(products);
    // console.log(result.results);
    this.setState({
      productsButton: result,
    });
    console.log(productsButton);
  }

  render() {
    const { categories } = this.state;
    return (
      <main>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <label htmlFor="products">
          Pesquisar Produtos:
          <input
            name="products"
            data-testid="query-input"
            type="text"
            id="products"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>

        <Link to="/ShoppingCart" data-testid="shopping-cart-button">
          <button
            type="button"

          >
            Button
          </button>
        </Link>

        <div>
          {categories.map((categorie) => (
            <label key={ categorie.id } htmlFor={ categorie.id }>
              <input type="radio" value={ categorie.name } />
              <p data-testid="category" id={ categorie.id }>
                { categorie.name }
              </p>
            </label>
          ))}
        </div>

      </main>

    );
  }
}
