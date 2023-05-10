import { combineReducers } from "redux";
import medicamentos from "./medicamentos";
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
  medicamentos,
  errors,
  messages,
  auth
});