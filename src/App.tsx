import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import Details from './components/Details';
import Cart from './components/Cart';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Search />
      <List />
      <Details />
      <Cart />
    </div>
  );
}

export default App;
