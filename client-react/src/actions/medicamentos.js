import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_MEDS, DELETE_MEDS, ADD_MEDS } from './types';
import { createMessage , returnErrors } from './messages';

//GET_MEDS

export const getMeds = () => (dispatch) =>{

   

    axios
        .get("http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/medicamentos/")

        .then(res => {
            dispatch({
                type: GET_MEDS,
                payload: res.data,
            });
        }) 
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE MEDS
export const deleteMeds = (id) => (dispatch) => {



    axios
      .delete(`http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/medicamentos/${id}/`)
      .then((res) => {
        dispatch(createMessage({Delete_medicamento: "Medicamento Eliminado"}))
        dispatch({
          type: DELETE_MEDS,
          payload: id
        });
      })
      .catch((err) => console.log(err));
  };

// ADD MEDS
export const addMeds = (medicamento) => (dispatch,getState) => {


    axios
      .post('http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/medicamentos/', medicamento, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({Add_medicamento: "Medicamento Adicionado"}))
        dispatch({
          type: ADD_MEDS,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)) );
  };