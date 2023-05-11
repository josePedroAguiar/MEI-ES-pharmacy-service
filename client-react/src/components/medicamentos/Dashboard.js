import React, {Fragment} from 'react';
import Form from './Form';
import Medicamentos from './Medicamentos';
import ListDrugs from '../prescription/ListDrugs';

export default function Dashboard() {
  return (
    <div>
        <Fragment>
            <Form />
            <ListDrugs />
        </Fragment>
      
    </div>
  )
}
