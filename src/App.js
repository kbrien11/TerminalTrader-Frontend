import React, { Component } from 'react';
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Portfolio from './components/Portfolio'
import Stocks from './components/Stocks'
import Crypto from './components/Crypto'
import History from './components/History'
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
     <div className="App">
     <Route exact path = "/" component = {Signup}/>
     <Route exact path = "/login" component = {Login}/>
     <Route exact path = "/home" component = {Home}/>
     <Route exact path = "/stocks" component = {Stocks}/>
    
     <Route exact path = "/crypto" component = {Crypto}/>
     <Route exact path = "/history" component = {History}/>


      </div>
      </BrowserRouter>
  )
}

export default App;
