import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/authentication/Login';
function App() {

  return (
  //   <Routes>
  //     <Route path="/" element={<Login />} />
  // </Routes>
  <Login/>  
  );
}

export default App;
