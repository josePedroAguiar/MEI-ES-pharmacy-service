import logo from '../logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import React, {Component, Fragment} from "react";
//import { Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
//import Login from './authentication/Login';
import Login from './accounts/Login';
import Home from './home/home';
import Waiting from './waitingRoom/WaitingPage';
import NavBar from './NavBar';
import Register from './accounts/Register';

import { HashRouter as Router,BrowserRouter, Route,Switch, Routes, useNavigate} from "react-router-dom";

import { Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from "./layout/Header";
import Dashboard from "./medicamentos/Dashboard";
import Alerts from "./layout/Alerts";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from '../actions/auth';


import PrivateRoute from "./common/PrivateRoute";



//<Route path="/waiting" element={<Waiting />} />

//Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center'
};


class App extends Component{
  //const navigate = useNavigate();

componentDidMount(){
  store.dispatch(loadUser());
}
render() {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
              <Fragment>
                  <Header />
                  <Alerts />
                  <div className="container">
                      <Switch>
                          <PrivateRoute exact path="/" component={Dashboard} />
                          <Route exact path="/register" component={Register} />
                          <Route exact path="/login" component={Login} />
                      </Switch> 
                  </div>
              </Fragment>
          </Router>
      </AlertProvider>
  </Provider>
  );
}
}


export default App;
