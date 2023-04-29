import { useState, useEffect } from "react";
import QRCodeScanner from "./BeforeScan";
import { useNavigate } from 'react-router-dom';


function AfterScan(props) {
    const [user, setUser] = useState(props.user);
    function handleClicker(){
        console.log(props.username)
    }
  

    return (
        <div className="hero min-h-screen bg-base-100" >
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold"> Receipt Read!!</h1>
                    {user && <p className="py-6">Username = {user.username}</p>}
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="flex items-center justify-center h-screen ">
                            <div>
                                <div className="avatar">
                                    <div className="w-64 rounded">
                                        {user && <img src={user.avatar} />}
                                    </div>
                                </div>
                                {user && <p className="py-6">Username = {user.username}</p>}
                                {user && <p className="py-6">ID = {user.id}</p>}
                            </div>

                        </div>
                        <button className="btn" onClick={handleClicker}>Button</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AfterScan;