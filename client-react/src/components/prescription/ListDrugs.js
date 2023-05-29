import { useState, useEffect } from "react";
import NavBar from '../NavBar';
import Alerts from "../layout/Alerts";
import { createMessage } from "../../actions/messages";
import { useDispatch, useSelector  } from 'react-redux';
import prescriptionsData from "../../Prescriptions.json";
import { useLocation , Redirect} from 'react-router-dom';
import { getMeds , deleteMeds } from '../../actions/medicamentos';
import axios from 'axios';
//import QRCode from "qrcode";



function ListDrugs() {
    const location = useLocation();
    const [total, setTotal] = useState(0);
    const [prescribed_drugs, setDrugs] = useState([]);
    const [drugs, setPharmDrugs] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const userPrescriptions = prescriptionsData.users.find(user => user.user_id === location.state.user.user_id);
        if (userPrescriptions) {
          setDrugs(userPrescriptions.prescriptions);
        } else {
          setDrugs([]);
        }
      }, [location.state.user.user_id]);


      
        const dispatch = useDispatch();

        
        useEffect(() => {
            axios.get("http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/medicamentos")
              .then((res) => {
                setPharmDrugs(res.data);
                console.log(res.data);
              });
          }, []);
        

        useEffect(() => {
        setDrugs((prescribed_drugs) => {
            return prescribed_drugs.map((prescribedDrug) => {
              const manufacturerDrugs = drugs.filter(
                (drug) => drug.manufacturer === prescribedDrug.manufacturer
              );
              const updatedPrescribedDrug = {
                ...prescribedDrug,
                generics: [...manufacturerDrugs],
              };
              return updatedPrescribedDrug;
            });
          });
        }, [drugs]);




    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [selectedAmounts, setSelectedAmounts] = useState({});

   

    const addToSelectedDrugs = (drug, availableAmount, original) => {
        if(drug.availableAmount>0){
            dispatch(createMessage({Add_medicamento:'Drug Added'}));
        
        
       
        
        var changeAmount = availableAmount || original;
        setDrugs(prescribed_drugs.map((d) => {
            if (d.id === drug.id) {
                d.selectedAmount = Number(d.selectedAmount) + Number(changeAmount);
                d.availableAmount = Number(d.availableAmount) - Number(changeAmount);
                setSelectedAmounts({ ...selectedAmounts, [d.id]: d.availableAmount });
            
            }
            
            return d;
        }));
       
        //update the final price
        setTotal(total =>  total + drug.price * changeAmount);

        const drugAlreadySelected = selectedDrugs.some((d) => d.id === drug.id);
        if (drugAlreadySelected) {
            setSelectedDrugs(selectedDrugs.map((d) => {
                if (d.id === drug.id) {
                    d.selectedAmount = Number(d.selectedAmount) + Number(changeAmount);
                    
                }
                return d;
            }));
           
                
            
        } else {
            setSelectedDrugs([...selectedDrugs, { ...drug, availableAmount: changeAmount }]);
            
            
        }
        }
    };


    const removeFromSelectedDrugs = (drug) => {
        dispatch(createMessage({Delete_medicamento: "Drug Removed"}))
        var selectedAmount;
        selectedDrugs.map((d) => {
            if (d.id === drug.id) {
                selectedAmount = d.selectedAmount;
                
            }
            
            return d;
        });

        //update the final price
        setTotal(total =>  total - drug.price * drug.selectedAmount);
        setDrugs(prescribed_drugs.map((d) => {
            if (d.manufacturer === drug.manufacturer) {
                d.availableAmount = d.availableAmount + selectedAmount;//
                //drug.selectedAmount=0;
                d.selectedAmount = 0;
                
                setSelectedAmounts({ ...selectedAmounts, [d.id]: d.availableAmount });
            }

            
            return d;
        }));

        setSelectedDrugs(selectedDrugs.filter((d) => d.id !== drug.id));
        
       
        
    };



    const handleAmountChange = (drugId, newAmount) => {
        console.log("changed amount");
        setSelectedAmounts({ ...selectedAmounts, [drugId]: newAmount });




    };

    const handleGenericChange = (drugId, genericIndex) => {
        const selectedDrug = prescribed_drugs.find((drug) => drug.id === drugId);
        const selectedGeneric = selectedDrug.generics[genericIndex];
        selectedAmounts[selectedDrug.id]= selectedAmounts[selectedGeneric.id];
        const updatedDrug = {
          ...selectedDrug,
          id: selectedGeneric.id,
          name: selectedGeneric.name,
          manufacturer: selectedGeneric.manufacturer,
          price: selectedGeneric.price,
          selectedAmount: selectedGeneric.selectedAmount,
          generics: [selectedDrug, ...selectedDrug.generics.slice(0, genericIndex), ...selectedDrug.generics.slice(genericIndex + 1)]   
        };

        
        
        const updatedPrescribedDrugs = prescribed_drugs.map((drug) =>
          drug.id === drugId ? updatedDrug : drug 
          
        );
        
        setDrugs(updatedPrescribedDrugs);
        dispatch(createMessage({Change_medicamento: "Drug Changed"}))
       
      };

    function handleContinue(){
        console.log("continue");
        setShouldRedirect(true);
    }
    if(shouldRedirect){
        return <Redirect to="/payment" />;

    }

   

    return (
        
        <><div className="card card-body ">
            <div className="grid gap-32 grid-cols-2  pt-16">
                <div className="flex flex-col w-full lg:flex-row gap-64">
                    <div className="items-center">
                        <h2 className="text-4xl font-bold">List of prescribed_drugs</h2>
                        <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                            {prescribed_drugs.map((drug) => (
                                <li key={drug.id}>
                                    <div className="flex">
                                        <a>
                                            {drug.name} ({drug.manufacturer}) - ${drug.price.toFixed(2)}
                                        </a>
                                        <div className="flex items-center ml-2">
                                            <label htmlFor={`availableAmount-${drug.id}`}>availableAmount:</label>
                                            <input
                                                type="number"
                                                id={`availableAmount-${drug.id}`}
                                                className="input ml-1"
                                                min="0"
                                                max={drug.availableAmount}
                                                value={selectedAmounts[drug.id] || drug.availableAmount}
                                                onChange={(e) => handleAmountChange(drug.id, e.target.value)}
                                            />
                                            {drug.canBeChanged ? (
                                                <div className="dropdown">
                                                    <label tabIndex={0} className="btn m-1">
                                                        generic
                                                    </label>
                                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" >
                                                        {drug.generics.map((generic, index) => (
                                                            <li key={index}>
                                                                <a onClick={() => handleGenericChange(drug.id, index)}>
                                                                {generic.name} - ${generic.price.toFixed(2)}
                                                                </a>
                                                            </li>
                                                        ))
                                                        }
                                                    </ul>
                                                </div>
                                            ) : (
                                                <button className="btn m-1" disabled>
                                                    generic
                                                </button>
                                                
                                            )}
                                            <button className="btn btn-primary" onClick={() => addToSelectedDrugs(drug, selectedAmounts[drug.id], drug.availableAmount)}>
                                             Add </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-center items-center">
                        <img src="../assets/switch.png" style={{ filter: "invert(100%)", height: "100px", width: "12px" }} />
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold">Selected prescribed_drugs</h2>
                        <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                            {selectedDrugs.map((drug) => (
                                <li key={drug.id}>
                                    <a >
                                        {drug.name} ({drug.manufacturer}) - ${drug.price.toFixed(2)} {drug.selectedAmount}
                                        <button className="btn btn-secondary" onClick={() => removeFromSelectedDrugs(drug) }> Remove</button>
                                    </a>
                                    
                                </li>
                                
                            ))}
                            <h2 className="text-2xl font-bold">
                                Price:  {total} €  <button className="btn btn-accent" onClick={handleContinue}>Checkout</button>
                                
                            </h2>
                            
                        </ul>
                    </div>
                </div>
            </div>
            </div>              
        </>
    );
}

export default ListDrugs;