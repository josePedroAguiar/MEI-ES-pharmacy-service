import { useState } from "react";

function ListDrugs(props) {
    const [user, setUser] = useState(props.user);
    const [drugs, setDrugs] = useState([
        { id: 1, name: "Drug 1", manufacturer: "Manufacturer 1", price: 10.0, amount: "3" , selectedAmount: "0"},
        { id: 2, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0, amount: "3" , selectedAmount: "0"},
        { id: 3, name: "Drug 3", manufacturer: "Manufacturer 3", price: 30.0, amount: "3" , selectedAmount: "0"},
        { id: 4, name: "Drug 4", manufacturer: "Manufacturer 4", price: 40.0, amount: "3" , selectedAmount: "0"},
        { id: 5, name: "Drug 5", manufacturer: "Manufacturer 5", price: 50.0, amount: "3" , selectedAmount: "0"},
    ]);
    const [selectedDrugs, setSelectedDrugs] = useState([]);

    const addToSelectedDrugs = (drug) => {
        const drugIndex = drugs.findIndex((d) => d.id === drug.id);
        if (drugIndex >= 0) {
            const newDrugs = [...drugs];
            const selectedAmount = selectedAmounts[drug.id];
            const originalAmount = parseInt(drug.amount); // convert string to integer
            const remainingAmount = originalAmount - selectedAmount;
            if (remainingAmount >= 0) { // only add to selected drugs if there's enough remaining amount
                newDrugs[drugIndex] = { ...drug, selectedAmount: remainingAmount.toString() };
                setDrugs(newDrugs);
                setSelectedDrugs([...selectedDrugs, drug]);
            }
        }
    };
    const removeFromSelectedDrugs = (drug) => {
        const drugIndex = drugs.findIndex((d) => d.id === drug.id);
        setSelectedDrugs(selectedDrugs.filter((d) => d.id !== drug.id));
        if (drugIndex >= 0) {
            const newDrugs = [...drugs];
            const originalAmount = parseInt(drugs[drugIndex].amount);
            const selectedAmount = parseInt(drugs[drugIndex].selectedAmount);
            newDrugs[drugIndex] = { ...newDrugs[drugIndex], amount: originalAmount + parseInt(selectedAmount) };
            setDrugs(newDrugs);
        }
    };

    const handleAmountChange = (drugId, newAmount) => {
        setSelectedAmounts({ ...selectedAmounts, [drugId]: newAmount });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2">
                    <h2 className="text-2xl font-bold">List of Drugs</h2>
                    <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                        {drugs.map((drug) => (
                            <li key={drug.id}>
                                <div className="flex">
                                    <a onClick={() => addToSelectedDrugs(drug, selectedAmounts[drug.id] || drug.amount)}>
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
                </div>
                <div className="w-1/2">
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
                </div>
            </div>
        </div>
    );
}

export default ListDrugs;
