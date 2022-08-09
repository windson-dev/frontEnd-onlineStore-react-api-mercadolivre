import React, { Component } from 'react';

export default class shoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const getItemsLocalStorage = JSON.parse(localStorage.getItem('items'));
    this.setState({
      products: getItemsLocalStorage,
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        { !products ? (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </p>) : (
          products.map(({ name, price, quantity }, index) => (
            <div key={ index }>
              <div data-testid="shopping-cart-product-name">
                <p>
                  <strong> Nome: </strong>
                  { name }
                </p>

                <p>
                  <strong>Preço: </strong>
                  { price }
                </p>

                <p data-testid="shopping-cart-product-quantity">
                  <strong>Quantidade: </strong>
                  { quantity }
                </p>
                <br />
              </div>

            </div>
          )))}
      </div>
    );
  }
}
