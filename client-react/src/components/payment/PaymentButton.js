import React, { useState } from 'react';
import axios from 'axios';
import DeliveryStatus from './DeliveryStatus';
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";

const PaymentButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [shouldRedirectStepFunctions, setShouldRedirectStepFunctions] = useState(false);

    function handleContinue(){
      console.log("continue");
      setShouldRedirect(true);
    }
    function handleClick(){
      setShouldRedirectStepFunctions(true);
    }
    if(shouldRedirect){
        return <Redirect to="/reko" />;

    }
    if(shouldRedirectStepFunctions){
      return <Redirect to="/step" />;
    }
    

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="font-bold text-2xl py-10">Payment Mode:</h2>
      <ul className="menu bg-base-100 w-56 p-2 rounded-box font-bold text-2xl py-15">
        <li><a onClick={handleClick}>Card</a></li>
        <li><a onClick={handleClick}>Money</a></li>
        <li><a onClick={handleContinue}>Face Rekognition</a></li>
      </ul>
    </div>

      
    );
  };

export default PaymentButton;
