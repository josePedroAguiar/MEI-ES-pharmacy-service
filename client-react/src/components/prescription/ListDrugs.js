import { useState } from "react";
import NavBar from '../NavBar';
//import QRCode from "qrcode";

function ListDrugs(props) {

    const [total, setTotal] = useState(0);
    const [user, setUser] = useState(props.user);
    const [prescribed_drugs, setDrugs] = useState([
        {
            id: 1, name: "Drug 1", manufacturer: "Manufacturer 1", price: 5.0, availableAmount: 3, selectedAmount: 0, canBeChanged: true, generics: [
                { id: 1, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0 },
                { id: 2, name: "Drug 3", manufacturer: "Manufacturer 3", price: 20.0 },
            ]
        },
        {
            id: 2, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0, availableAmount: 3, selectedAmount: 0, canBeChanged: false, generics: [

                { id: 3, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0 },
                { id: 4, name: "Drug 3", manufacturer: "Manufacturer 3", price: 20.0 },
            ]
        },
        {
            id: 3, name: "Drug 3", manufacturer: "Manufacturer 3", price: 30.0, availableAmount: 3, selectedAmount: 0, canBeChanged: true, generics: [
                { id: 5, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0 },
                { id: 6, name: "Drug 3", manufacturer: "Manufacturer 3", price: 20.0 },
            ]
        },
        {
            id: 4, name: "Drug 4", manufacturer: "Manufacturer 4", price: 40.0, availableAmount: 3, selectedAmount: 0, canBeChanged: true, generics: [
                { id: 7, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0 },
                { id: 8, name: "Drug 3", manufacturer: "Manufacturer 3", price: 20.0 },
            ]
        },
        {
            id: 5, name: "Drug 5", manufacturer: "Manufacturer 5", price: 50.0, availableAmount: 5, selectedAmount: 0, canBeChanged: true, generics: [
                { id: 9, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0 },
                { id: 10, name: "Drug 3", manufacturer: "Manufacturer 3", price: 20.0 },
            ]
        },
    ]);
    
/*
    const drugsString = JSON.stringify(prescribed_drugs);

    QRCode.toCanvas(drugsString, function (error, canvas) {
        if (error) return console.log("Error generating QR code:", error);
      
        // `canvas` is the generated QR code image
        console.log(canvas);
      });*/

    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [selectedAmounts, setSelectedAmounts] = useState({});

   

    const addToSelectedDrugs = (drug, availableAmount, original) => {
        
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
    };


    const removeFromSelectedDrugs = (drug) => {
        
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
            if (d.id === drug.id) {
                d.availableAmount = d.availableAmount + selectedAmount;//
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
        const updatedDrug = {
          ...selectedDrug,
          name: selectedGeneric.name,
          manufacturer: selectedGeneric.manufacturer,
          price: selectedGeneric.price,
          generics: [selectedDrug, ...selectedDrug.generics.slice(0, genericIndex), ...selectedDrug.generics.slice(genericIndex + 1)]   
        };
        
        const updatedPrescribedDrugs = prescribed_drugs.map((drug) =>
          drug.id === drugId ? updatedDrug : drug 
          
        );
        
        setDrugs(updatedPrescribedDrugs);
       
      };

   

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
                                                                {generic.manufacturer} - ${generic.price.toFixed(2)}
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
                                Price:  {total} €  <button className="btn btn-accent">Checkout</button>
                                
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