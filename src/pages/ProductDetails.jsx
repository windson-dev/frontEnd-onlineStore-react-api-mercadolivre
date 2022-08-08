import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsID } from '../services/api';

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      details: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getProductsID(id);
    // console.log(id, result);
    this.setState({
      details: result,
    });
  }

  render() {
    const { details } = this.state;
    return (
      <section>
        <div>
          <p data-testid="product-detail-name">
            {details.title}
          </p>
          <p data-testid="product-detail-price">
            {details.price}
          </p>
        </div>
        <img
          src={ details.thumbnail }
          alt={ details.title }
          data-testid="product-detail-image"
        />
        <Link to="/ShoppingCart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Adicionar ao carrinho
          </button>
        </Link>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
