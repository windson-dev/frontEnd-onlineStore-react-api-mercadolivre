import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Orderpage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const products = await response.json();
    this.setState({ products });
  }

  render() {
    const { products: { title, thumbnail, price } } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{ title }</h1>

        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />

        <h3 data-testid="product-detail-price">
          { `Preço: R$${price} `}
        </h3>

        <Link
          to={ `/shoppingcart/${title}/${price}` }
          data-testid="product-detail-add-to-cart"
        >
          <button
            type="submit"
            data-testid="shopping-cart-button"
          >
            Adicionar ao Carrinho
          </button>
        </Link>

      </div>
    );
  }
}

Orderpage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
