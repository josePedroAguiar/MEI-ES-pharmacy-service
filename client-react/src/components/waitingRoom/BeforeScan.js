import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function BeforeScan(props) {
  const navigate = useNavigate();
  const [qrCodeScanned, setQrCodeScanned] = useState(false);
  const [button, setButton] = useState(false);



  useEffect(() => {
    if (qrCodeScanned) {
      console.log("QRCodeScanner= " + qrCodeScanned);
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
  const dotsElement = <span style={{ width: '1.5em', display: 'inline-block' }}>{dotsText}</span>;

  const handleClick = () => {
    setButton(true);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <button onClick={handleClick}>
          <div className="avatar">
            <div className="w-64 rounded-xl">
            <img src="../assets/qr_code.png" style={{ filter: "invert(100%) grayscale(100%)" }} />
            </div>
          </div>
        </button>
        <div>
          <h1 className="text-5xl font-bold">Waiting for Scanner{dotsElement}</h1>
          <p className="py-6">Scan a costumer QR code to continue</p>
          {button ? (
            <button className="btn btn-primary " onClick={props.handleScanner}>Continue</button>
          ) :
            (
              <button className="btn" disabled>Continue</button>
            )}
        </div>
      </div>
    </div>

  );
}

export default BeforeScan;