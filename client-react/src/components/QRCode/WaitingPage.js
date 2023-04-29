import { useState, useEffect } from "react";
//import QRCodeScanner from "./QRCodeScanner";
import { Button } from "react-bootstrap";
import { Clock } from "react-feather";
//import Banner from "../NavBar";
import NavBar from '../NavBar';

function WaitingPage() {
  //const [qrCodeScanned, setQrCodeScanned] = useState(false);

  useEffect(() => {
    const scanQRCode = () => {
      setTimeout(() => {
        //setQrCodeScanned(true);
      }, 5000);
    };
    scanQRCode();
  }, []);

  return (
    <>
    <NavBar userName  ="John Doe"/>

    <div className="flex items-center justify-center h-screen ">
      {/*qrCodeScanned ? ( */}
   
      <div>
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome!</h1>
          <div className="flex items-center mb-1">
            <Clock size={24} className="text-white mr-2" />
            <span className="text-lg text-white">{new Date().toLocaleString()}</span>
        </div>
      </div>
      {/*
      ) : (
        <QRCodeScanner onScan={() => setQrCodeScanned(true)} />
      )
      }*/}
    </div>
    </>
  );
}

export default WaitingPage;