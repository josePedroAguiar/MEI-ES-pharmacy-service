import React, {Fragment} from 'react';
import Form from './Form';
import Medicamentos from './Medicamentos';

export default function Dashboard() {
  return (
    <div>
        <Fragment>
            <Form />
            <Medicamentos />
        </Fragment>
      
    </div>
  )
}
