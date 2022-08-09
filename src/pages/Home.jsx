import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories,
  getProducts, getCategoriesFromID } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: '',
      productsButton: [],
      categoriesArray: [],
      radioChanged: false,
      detailProduts: [],
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

  handleChangeRadios = async ({ target }) => {
    this.setState({ radioChanged: true });
    const { id } = target;
    const response = await getCategoriesFromID(id);
    const categoriesArray = await response.results;
    this.setState({
      categoriesArray,
    });
  }

  // Função que manipula o local storage.
  getParamsFromLocalStorage = (title, price1) => {
    // Objeto utilizado para armazenar no localStorage e depois ser Renderizado na Tela.
    const storage = {
      name: title,
      price: price1,
      quantity: 1,
    };
    // Utilizando o prevState para conseguir manter o objeto(produto) anterior dentro do localStorage...
    // e adicionar objetos(produto) produtos novos junto com o spread operator.
    this.setState((prevState) => (
      { detailProduts: [...prevState.detailProduts, storage],
      }), () => {
      const { detailProduts } = this.state;
      // Amazenando e passando para string os objetos...
      // o objeto
      localStorage.setItem('items', JSON.stringify(detailProduts));
    });
  }

  render() {
    const {
      categories,
      productsButton,
      categoriesArray,
      radioChanged } = this.state;
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
            onClick={ this.handleChange }
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
            Carrinho
          </button>
        </Link>

        <aside>
          {
            categories.map(({ id, name }) => (
              <label key={ id } htmlFor={ id }>
                <input
                  type="radio"
                  value={ name }
                  name="categoryRadios"
                  id={ id }
                  onChange={ this.handleChangeRadios }
                />
                <p data-testid="category" id={ id }>
                  { name }
                </p>
              </label>
            ))
          }
        </aside>

        {
          productsButton.length === 0
            ? <p>Nenhum produto foi encontrado</p>
            : productsButton.map(({ title, thumbnail, price, id }) => (
              <div key={ id }>
                <Link
                  to={ `/orderpage/${id}` }
                  data-testid="product-detail-link"
                >
                  <div data-testid="product">
                    <p>{title}</p>
                    <img src={ thumbnail } alt={ title } />
                    <p>{`Preço: R$${price}`}</p>
                  </div>
                </Link>
                <Link
                  to={ `/shoppingcart/${title}/${price}` }
                  data-testid="product-add-to-cart"
                >
                  <button
                    type="submit"
                  >
                    Adicionar ao Carrinho
                  </button>
                </Link>
              </div>
            ))
        }

        {radioChanged && (
          categoriesArray.map(({ title, thumbnail, price, id }) => (
            <div key={ id }>
              <Link
                to={ `/orderpage/${id}` }
                data-testid="product-detail-link"
              >
                <div
                  data-testid="product"
                >
                  <p>{ title }</p>
                  <img src={ thumbnail } alt={ title } />
                  <p><strong>{ `Preço: ${price}` }</strong></p>
                </div>
              </Link>
              <button
                type="submit"
                data-testid="product-add-to-cart"
                onClick={ () => this.getParamsFromLocalStorage(title, price) }
              >
                Adicionar ao Carrinho
              </button>

            </div>
          ))
        )}

      </main>

    );
  }
}
