import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Login from './components/authentication/Login';
import Home from './components/home/Home';

function App() {
  //const navigate = useNavigate();
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter >
      );
}

      export default App;
