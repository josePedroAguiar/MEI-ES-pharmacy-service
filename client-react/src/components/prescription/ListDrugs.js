import { useState } from "react";
import NavBar from '../NavBar';

function ListDrugs(props) {
    const [user, setUser] = useState(props.user);
    const [drugs, setDrugs] = useState([
        { id: 1, name: "Drug 1", manufacturer: "Manufacturer 1", price: 10.0, amount: "3" },
        { id: 2, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0, amount: "3" },
        { id: 3, name: "Drug 3", manufacturer: "Manufacturer 3", price: 30.0, amount: "3" },
        { id: 4, name: "Drug 4", manufacturer: "Manufacturer 4", price: 40.0, amount: "3" },
        { id: 5, name: "Drug 5", manufacturer: "Manufacturer 5", price: 50.0, amount: "3" },
    ]);

    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [selectedAmounts, setSelectedAmounts] = useState({});




    const addToSelectedDrugs = (drug, amount, original) => {
        var change_amount = 0;
        if(typeof amount!== "undefined"){
            change_amount = amount;
        }else{
            change_amount = original; 
        }

        /*
        if(selectedAmounts.includes(drug.id)){
            console.log("Inclui")
            setSelectedDrugs
            (drugs.map((d) => {
                if (d.id === drug.id) {
                    d.amount = drug.amount;
                }
                return d;
            }));
        }
        else{
            setSelectedDrugs([...selectedDrugs, drug]);

        }
        */


        console.log(change_amount);
        setDrugs(drugs.map((d) => {
            console.log("map");
            console.log(d.amount);
            console.log(change_amount);
            if (d.id == drug.id) {
                d.amount = d.amount - change_amount;
            }
            console.log("resto" + d.amount);
            return d;
        }));

        setSelectedDrugs([...selectedDrugs, drug]);




    };

    const removeFromSelectedDrugs = (drug) => {
        setSelectedDrugs(selectedDrugs.filter((d) => d.id !== drug.id));
    };

    const handleAmountChange = (drugId, newAmount) => {
        setSelectedAmounts({ ...selectedAmounts, [drugId]: newAmount });
    };

    return (
        <>
            <NavBar fixed={true} userName="John Doe" />
            <h2 className="text-2xl font-bold">List of Drugs</h2>
            <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                {drugs.map((drug) => (
                    <li key={drug.id}>
                        <div className="flex">
                            <a onClick={() => addToSelectedDrugs(drug, selectedAmounts[drug.id], drug.amount)}>
                                {drug.name} ({drug.manufacturer}) - ${drug.price.toFixed(2)}
                            </a>
                            <div className="flex items-center ml-2">
                                <label htmlFor={`amount-${drug.id}`}>Amount:</label>
                                <input type="number" id={`amount-${drug.id}`} className="input ml-1" min="1" max={drug.amount}
                                    value={selectedAmounts[drug.id] || drug.amount} onChange={(e) => handleAmountChange(drug.id, e.target.value)} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-bold">Selected Drugs</h2>
            <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                {selectedDrugs.map((drug) => (
                    <li key={drug.id}>
                        <a onClick={() => removeFromSelectedDrugs(drug)}>
                            {drug.name} ({drug.manufacturer}) - ${drug.price.toFixed(2)} {drug.amount}
                        </a>
                    </li>
                ))}
            </ul>

        </>
    );
}

export default ListDrugs;