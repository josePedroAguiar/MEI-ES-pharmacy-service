import { useState, useEffect } from "react";
import NavBar from '../../components/NavBar';
import ScreenBeforeScan from "../../components/waitingRoom/BeforeScan"
import ScreenAfterScan from "../../components/waitingRoom/AfterScan"


function WaitingPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [user, setUser] = useState([]);
 
 

  const handleScanSuccess = () => {
    setShowScanner(false);
  }
  

  const handleScanner = (selectedUser) => {
    //console.log(selectedUser);
    //populateDefaultUser(user);
    
   
    setUser(selectedUser);
    
    setShowScanner(true);
    
  };

  useEffect(()=>{
    //console.log(user);
  })
  const populateDefaultUser = (user) => {
  
        setUser(user);
     
  }
  return (
    <>

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