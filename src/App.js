import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from '../Pages/Home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
      </BrowserRouter>
    );
  }
}
