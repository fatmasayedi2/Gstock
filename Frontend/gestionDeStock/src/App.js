import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct';
import UpdateProduct from './components/UpdateProduct';

import Client from './components/Client';
import Signup from './components/Signup';
import Login from './components/Login';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeWithNavbar />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/products" element={<ProductsWithNavbar />} />
          <Route path="/insertproduct" element={<InsertProductWithNavbar />} />
          <Route path="/updateproduct/:id" element={<UpdateProductWithNavbar />} />
          <Route path="/client" element={<ClientWithNavbar />} />
          
        </Routes>
      </Router>
    </div>
  );
}


function HomeWithNavbar() {
  return (
    <>
      <Navbar title="IMS" about="About" />
      <Home />
    </>
  );
}


function ProductsWithNavbar() {
  return (
    <>
      <Navbar title="IMS" about="About" />
      <Products />
    </>
  );
}

function InsertProductWithNavbar() {
  return (
    <>
      <Navbar title="IMS" about="About" />
      <InsertProduct />
    </>
  );
}

function UpdateProductWithNavbar() {
  return (
    <>
      <Navbar title="IMS" about="About" />
      <UpdateProduct />
    </>
  );
}


function ClientWithNavbar() {
  return (
    <>
      <Navbar title="IMS" about="About" />
      <Client />
    </>
  );
}

export default App;
