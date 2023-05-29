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
import Medicamentos from './medicamentos/Medicamentos';
import PaymentButton from './payment/PaymentButton';
import DeliveryStatus from './payment/DeliveryStatus';
import Test from './payment/StepFunctions'
import Reko from './payment/Reko';
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
                          <PrivateRoute exact path="/list" component={ListDrugs} />
                          <PrivateRoute exact path="/medicamentos" component={Medicamentos}/>
                          <PrivateRoute exact path="/payment" component={PaymentButton}/>
                          <PrivateRoute exact path="/delivery" component={DeliveryStatus}/>
                          <PrivateRoute exact path="/step" component={Test}/>

                          <PrivateRoute exact path="/reko" component={Reko}/>
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
