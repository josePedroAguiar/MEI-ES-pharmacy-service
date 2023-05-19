import React, { useState, useEffect } from "react";
import prescriptionsData from "../../Prescriptions.json";

function BeforeScan(props) {
  const [qrCodeScanned, setQrCodeScanned] = useState(false);
  const [button, setButton] = useState(false);
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track the mounted state of the component

    setUsers(prescriptionsData.users);

    return () => {
      // Cleanup function
      // Cancel any ongoing asynchronous tasks or subscriptions here
      // In this case, there are no asynchronous tasks to cancel, so no additional code is needed.
      isMounted = false; // Mark the component as unmounted
    };
  }, []);

  useEffect(() => {
    if (qrCodeScanned) {
      console.log("QRCodeScanner= " + qrCodeScanned);
    }
  }, [qrCodeScanned]);

  useEffect(() => {
    const scanQRCode = () => {
      const timer = setTimeout(() => {
        if (isMounted) {
          setQrCodeScanned(true);
        }
      }, 5000);

      return () => {
        clearTimeout(timer); // Clear the timer if the component unmounts before the timeout
      };
    };

    let isMounted = true; // Track the mounted state of the component
    const scanTimer = scanQRCode();

    return () => {
      isMounted = false; // Mark the component as unmounted
      scanTimer(); // Call the cleanup function returned from scanQRCode
    };
  }, []);

  const [dots, setDots] = useState(0);

  useEffect(() => {
    let isMounted = true; // Track the mounted state of the component

    const interval = setInterval(() => {
      if (isMounted) {
        setDots((dots) => (dots + 1) % 4);
      }
    }, 1000);

    return () => {
      isMounted = false; // Mark the component as unmounted
      clearInterval(interval); // Clear the interval if the component unmounts
    };
  }, []);

  const dotsText = ".".repeat(dots);
  const dotsElement = (
    <span style={{ width: "1.5em", display: "inline-block" }}>
      {dotsText}
    </span>
  );

  const handleClick = (user) => {
    setButton(true);
    setUserSelected(user);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <ul className="menu bg-base-100 w-56 rounded-box">
          {users.map((user, index) => (
            <li key={index}>
              <div className="flex h-56">
                <a onClick={() => handleClick(user)}>
                  <img
                    src={user.qrcode}
                    style={{ filter: "invert(100%) grayscale(100%)" }}
                    alt="QR Code"
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <h1 className="text-5xl font-bold">
            Waiting for Scanner{dotsElement}
          </h1>
          <p className="py-6">Scan a customer QR code to continue</p>
          {button ? (
            <button className="btn btn-primary " onClick={() =>props.handleScanner(userSelected)}>Continue</button>
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