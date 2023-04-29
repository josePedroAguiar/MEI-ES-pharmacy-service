import { useState } from "react";
import { QrReader } from 'react-qr-reader';

function QRCodeScanner(props) {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleScan = (data) => {
    if (data) {
      props.onScan(data);
    }
  };

  const handleError = (err) => {
    setErrorMessage(err.toString());
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default QRCodeScanner;