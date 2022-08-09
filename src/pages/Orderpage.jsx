import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Orderpage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      productsCart: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const products = await response.json();
    this.setState({
      products,
    });
  }

  getParamsFromLocalStorage = (title, price1) => {
    const storage = {
      name: title,
      price: price1,
      quantity: 1,
    };
    const getItemsLocalStorage = JSON.parse(localStorage.getItem('items'));

    if (getItemsLocalStorage) {
      getItemsLocalStorage.splice(0, 0, storage);
      localStorage.setItem('items', JSON.stringify(getItemsLocalStorage));
    } else {
      this.setState((prevState) => (
        { productsCart: [...prevState.productsCart, storage],
        }), () => {
        const { productsCart } = this.state;

        localStorage.setItem('items', JSON.stringify(productsCart));
      });
    }
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
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.getParamsFromLocalStorage(title, price) }
        >
          Adicionar ao Carrinho
        </button>

        <Link to="/Shoppingcart" data-testid="shopping-cart-button">
          <button
            type="button"
          >
            Ir para o carrinho
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
