import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
import Login from './components/authentication/Login';
import Home from './components/home/Home';
import Waiting from './pages/waitingRoom/WaitingPage';
import NavBar from './components/NavBar';
import ListDrugs from './components/prescription/ListDrugs';


function App() {
  //const navigate = useNavigate();
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/waiting" element={<Waiting />} />
          <Route path="/list" element={<ListDrugs />} />
        </Routes>
    </BrowserRouter >
  );
}

export default App;
