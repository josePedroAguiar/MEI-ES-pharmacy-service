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
      if(shouldRedirect){
        return <Redirect to="/reko" />;
      }
    };
    function handleContinue(){
      console.log("continue");
      setShouldRedirect(true);
    }
    if(shouldRedirect){
        return <Redirect to="/reco" />;

    }
  
    

  

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="font-bold text-2xl py-10">Payment Mode:</h2>
      <ul className="menu bg-base-100 w-56 p-2 rounded-box font-bold text-2xl py-15">
        <li><a>Card</a></li>
        <li><a>Money</a></li>
        <li><a onClick={handleContinue}>Face Rekognition</a></li>
      </ul>
    </div>

      
    );
  };

export default PaymentButton;
