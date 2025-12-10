import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List/List';
import Cart from './components/Cart/Cart';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import { Route, BrowserRouter, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar onLogout={() => setIsLoggedIn(false)} />
        <Routes>
          <Route path='/shopping' element={isLoggedIn ? <><List /> <Cart /></> : <Navigate to="/login" />} />
          <Route path='/login' element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
