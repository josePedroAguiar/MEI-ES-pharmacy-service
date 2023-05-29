import React, { useState } from 'react';
import axios from 'axios';
import DeliveryStatus from './DeliveryStatus';
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";

const PaymentButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handlePayment = async () => {
      // Fazer uma solicitação POST para o backend Django para processar o pagamento
      await axios.post('http://127.0.0.1:8000/process-payment2/');
      console.log("continue");
      setShouldRedirect(true);
    };
  
    if(shouldRedirect){
      return <Redirect to="/delivery" />;

  }

    return (
      <div>
        <h2>Finalizar Pagamento</h2>
        <button onClick={handlePayment}>Finalizar Pagamento</button>
      </div>
    );
  };

export default PaymentButton;
