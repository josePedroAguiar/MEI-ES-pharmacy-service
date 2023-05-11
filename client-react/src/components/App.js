import logo from '../logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import React, {Component, Fragment} from "react";
import { HashRouter as Router,BrowserRouter, Route,Switch, Routes, Redirect} from "react-router-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider} from 'react-alert';
import store from "../store";
import { loadUser } from '../actions/auth';
//import { Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
//import Login from './authentication/Login';
import Login from './accounts/Login';
import Waiting from '../pages/waitingRoom/WaitingPage';
import Register from './accounts/Register';
import ListDrugs from './prescription/ListDrugs'
import AlertTemplate from 'react-alert-template-basic';
import Header from "./layout/Header";
import Dashboard from "./medicamentos/Dashboard";
import Alerts from "./layout/Alerts";
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
                          <PrivateRoute exact path="/" component={Waiting} />
                          <Route exact path="/register" component={Register} />
                          <Route exact path="/login" component={Login} />
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
                          <PrivateRoute exact path="/list" component={ListDrugs} />
>>>>>>> Stashed changes
=======
                          <Route exact path="/list" component={ListDrugs} />
>>>>>>> 5b4fd5466549879bd851f6a5387da41cd322c2af
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
