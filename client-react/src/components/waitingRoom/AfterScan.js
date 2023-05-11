import { useState, useEffect } from "react";
import QRCodeScanner from "./BeforeScan";
import { useNavigate } from 'react-router-dom';


function AfterScan(props) {
    const [user, setUser] = useState(props.user);

    const [shouldRedirect, setShouldRedirect] = useState(false);


    function handleContinue(){
        console.log("continue");
        setShouldRedirect(true);
    }
    if(shouldRedirect){
        return <Redirect to="/dash" />;

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                {user && <img src={user.avatar} className="max-w-sm rounded-lg shadow-2xl" />}
                <div>
                    {user && <h1 className="text-5xl font-bold">{user.username}</h1>}
                    {user && <p className="py-6">Número de utente: {user.id}</p>}
                    <button className="btn btn-primary">Continue</button>
                </div>
            </div>
        </div>
    );
}

export default AfterScan;