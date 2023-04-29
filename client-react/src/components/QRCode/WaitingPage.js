import { useState, useEffect } from "react";
import QRCodeScanner from "./QRCodeScanner";
import { Button } from "react-bootstrap";
import { Clock } from "react-feather";
import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom';
function WaitingPage() {
  const [qrCodeScanned, setQrCodeScanned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (qrCodeScanned) {
      //navigate("/buying");
      console.log("QRCodeScanner= "+ qrCodeScanned);
    }
  }, [qrCodeScanned]);


  useEffect(() => {
    const scanQRCode = () => {
      setTimeout(() => {
        setQrCodeScanned(true);
      }, 5000);
    };
    scanQRCode();
  }, []);
  
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(dots => (dots + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dotsText = '.'.repeat(dots);


  return (
    <>
      <NavBar fixed={true} userName="John Doe" />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold"> Waiting Room</h1>
            <p className="py-6">Scan a costumer QRCode to continue!</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="flex items-center justify-center h-screen ">
                {qrCodeScanned ? (
                  <div>
                    <h1 className="text-4xl font-bold mb-4 text-white">Waiting for Scanner{dotsText}</h1>
                  </div>
                ) : (
                  <QRCodeScanner onScan={() => setQrCodeScanned(true)} />
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WaitingPage;