import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Login from './components/authentication/Login';
function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter >
      );
}

      export default App;
