import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories,
  getProducts } from '../services/api';

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
    const { products } = this.state;
    const result = await getProducts(products);
    this.setState({
      productsButton: result.results,
    });
  }

  render() {
    const { categories, productsButton } = this.state;
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

        <aside>
          {categories.map((categorie) => (
            <label key={ categorie.id } htmlFor={ categorie.id }>
              <input type="radio" value={ categorie.name } />
              <p data-testid="category" id={ categorie.id }>
                { categorie.name }
              </p>
            </label>
          ))}
        </aside>
        {
          productsButton.length === 0 ? <p>Nenhum produto foi encontrado</p>
            : productsButton.map(({ title, thumbnail, price, id }) => (
              <div key={ id } data-testid="product">
                <p>{title}</p>
                <img src={ thumbnail } alt={ title } />
                <p>
                  {price}
                  {' '}
                  R$
                </p>
              </div>
            ))
        }
      </main>

    );
  }
}
