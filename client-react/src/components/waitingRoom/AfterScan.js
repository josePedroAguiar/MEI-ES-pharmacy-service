import { useState, useEffect } from "react";
import QRCodeScanner from "./BeforeScan";
import { useNavigate } from 'react-router-dom';
import ListDrugs from "../prescription/ListDrugs";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';


function AfterScan(props) {
    const history = useHistory();
    const [user, setUser] = useState(props.user);

    const [shouldRedirect, setShouldRedirect] = useState(false);
    useEffect(()=>{
        console.log(user);
      })
/*
    function handleContinue(){
        console.log("continue");
        setShouldRedirect(true);
    }
    if(shouldRedirect){
        return <Redirect to="/list" />;

    }*/
    function handleContinue() {
        // Your logic here
      
        // Redirect to "/list" route with the user prop
        history.push({
          pathname: '/list',
          state: { user: user },
        });
      }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src={user.avatar} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                     <h1 className="text-5xl font-bold">{user.user_name}</h1>
                     <p className="py-6">Número de utente: {user.user_id}</p>
                    <button className="btn btn-primary"  onClick={handleContinue}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default AfterScan;