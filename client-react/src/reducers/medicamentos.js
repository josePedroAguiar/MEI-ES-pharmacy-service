import { DELETE_MEDS, GET_MEDS, ADD_MEDS } from '../actions/types.js';

const initialState = {
  medicamentos: []
};

const medicamentos = (state = initialState, action) =>{
  switch (action.type) {
    case GET_MEDS:
      return {
        ...state,
        medicamentos: action.payload
      };
    case DELETE_MEDS:
      return {
        ...state,
        medicamentos: state.medicamentos.filter((medicamento) => medicamento.id !== action.payload),
      };
    case ADD_MEDS:
      return {
        ...state,
        medicamentos: [...state.medicamentos, action.payload]
      };

    default:
      return state;
  }
}

export default medicamentos;