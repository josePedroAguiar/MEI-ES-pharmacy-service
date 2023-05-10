import { useState, useEffect } from "react";
import NavBar from '../../components/NavBar';
import ScreenBeforeScan from "../../components/waitingRoom/BeforeScan"
import ScreenAfterScan from "../../components/waitingRoom/AfterScan"

function WaitingPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [user, setUser] = useState(null);

  const handleScanSuccess = () => {
    setShowScanner(false);
  }

  const handleScanner = () => {
    console.log("populated");
    populateDefaultUser();
    setShowScanner(true);
  };
  const populateDefaultUser = () => {
    const user = {
      id: 1,
      username: "Joaquim da Silva",
      avatar: "../assets/default_persona.jpg"
    };
    setUser(user);
  }
  return (
    <>
      <NavBar fixed={true} userName="John Doe" />

      {showScanner ? (
        <ScreenAfterScan user={user} />
      ) : (
        <ScreenBeforeScan handleScanner={handleScanner} />
      )
      }
    </>
  );
}

export default WaitingPage;