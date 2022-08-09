import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class shoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      price: '',
    };
  }

  componentDidMount() {
    const { match: { params: { title, price } } } = this.props;
    this.setState({ title, price });
  }

  render() {
    const { title, price } = this.state;
    return (
      <div>
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
        <h2 data-testid="shopping-cart-product-name">{title}</h2>
        <h3>{`Preço: ${price}`}</h3>
        <p data-testid="shopping-cart-product-quantity">Quantidade: 1</p>
      </div>
    );
  }
}

shoppingCart.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
