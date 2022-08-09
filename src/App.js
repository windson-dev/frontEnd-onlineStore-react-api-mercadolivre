import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Orderpage from './pages/Orderpage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route exact path="/orderpage/:id" component={ Orderpage } />
        <Route
          exact
          path="/shoppingcart/:title/:price"
          component={ ShoppingCart }
        />
      </BrowserRouter>
    );
  }
}
