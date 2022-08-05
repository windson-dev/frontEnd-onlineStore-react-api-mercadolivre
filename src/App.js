import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route exact path="/ShoppingCart" component={ ShoppingCart } />
      </BrowserRouter>
    );
  }
}
