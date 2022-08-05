import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const result = await getCategories();
    this.setState({
      categories: result,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <main>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

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
