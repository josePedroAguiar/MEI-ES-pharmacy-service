import { useState } from "react";
import NavBar from '../NavBar';

function ListDrugs(props) {
    const [user, setUser] = useState(props.user);
    const [prescribed_drugs, setDrugs] = useState([
        { id: 1, name: "Drug 1", manufacturer: "Manufacturer 1", price: 5.0, available_amount: 3, selected_amount: 0 },
        { id: 2, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0, available_amount: 3, selected_amount: 0 },
        { id: 3, name: "Drug 3", manufacturer: "Manufacturer 3", price: 30.0, available_amount: 3, selected_amount: 0 },
        { id: 4, name: "Drug 4", manufacturer: "Manufacturer 4", price: 40.0, available_amount: 3, selected_amount: 0 },
        { id: 5, name: "Drug 5", manufacturer: "Manufacturer 5", price: 50.0, available_amount: 5, selected_amount: 0 },
    ]);

    const [pharmacy_drugs, setGeneric] = useState([
        { id: 1, name: "Drug 1", manufacturer: "Manufacturer 6", price: 2.0 },
        { id: 2, name: "Drug 2", manufacturer: "Manufacturer 7", price: 10.0 },
    ]);

    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [selectedAmounts, setSelectedAmounts] = useState({});


    const addToSelectedDrugs = (drug, available_amount, original) => {
        var change_amount = available_amount || original;


        setDrugs(prescribed_drugs.map((d) => {
            if (d.id === drug.id) {
                d.selected_amount = Number(d.selected_amount) + Number(change_amount);
                d.available_amount = Number(d.available_amount) - Number(change_amount);
                setSelectedAmounts({ ...selectedAmounts, [d.id]: d.available_amount });

            }
            return d;
        }));

        const drugAlreadySelected = selectedDrugs.some((d) => d.id === drug.id);
        if (drugAlreadySelected) {
            setSelectedDrugs(selectedDrugs.map((d) => {
                if (d.id === drug.id) {
                    d.selected_amount = Number(d.selected_amount) + Number(change_amount);
                }
                return d;
            }));
        } else {
            setSelectedDrugs([...selectedDrugs, { ...drug, available_amount: change_amount }]);
        }
    };


    const removeFromSelectedDrugs = (drug) => {
        var selected_amount;
        selectedDrugs.map((d) => {
            if (d.id === drug.id) {
                selected_amount = d.selected_amount;
            }
            return d;
        });


        setDrugs(prescribed_drugs.map((d) => {
            if (d.id === drug.id) {
                d.available_amount = d.available_amount + selected_amount;//
                d.selected_amount = 0;
                setSelectedAmounts({ ...selectedAmounts, [d.id]: d.available_amount });


            }
            return d;
        }));

        setSelectedDrugs(selectedDrugs.filter((d) => d.id !== drug.id));
    };



    const handleAmountChange = (drugId, newAmount) => {
        console.log("changed amount");
        setSelectedAmounts({ ...selectedAmounts, [drugId]: newAmount });
    };

    return (
        <>
            <NavBar fixed={true} userName="John Doe" />
            <div className="grid gap-32 grid-cols-2  pt-16">

                <div className="flex flex-col w-full lg:flex-row gap-64">

                    <div>
                        <h2 className="text-2xl font-bold">List of prescribed_drugs</h2>
                        <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                            {prescribed_drugs.map((drug) => (
                                <li key={drug.id}>
                                    <div className="flex">
                                        <a onClick={() => addToSelectedDrugs(drug, selectedAmounts[drug.id], drug.available_amount)}>
                                            {drug.name} ({drug.manufacturer}) - ${drug.price.toFixed(2)}
                                        </a>
                                        <div className="flex items-center ml-2">
                                            <label htmlFor={`available_amount-${drug.id}`}>available_amount:</label>
                                            <input type="number" id={`available_amount-${drug.id}`} className="input ml-1" min="0" max={drug.available_amount}
                                                value={selectedAmounts[drug.id] || drug.available_amount} onChange={(e) => handleAmountChange(drug.id, e.target.value)} />
                                            <div className="dropdown">
                                                <label tabIndex={0} className="btn m-1">generic</label>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><a>Item 1</a></li>
                                                    <li><a>Item 2</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="divider lg:divider-horizontal" >
                        <img src="../assets/switch.png" style={{ filter: "invert(100%)", height: "40px" , width: '21px'}} />

                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">Selected prescribed_drugs</h2>
                        <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                            {selectedDrugs.map((drug) => (
                                <li key={drug.id}>
                                    <a onClick={() => removeFromSelectedDrugs(drug)}>
                                        {drug.name} ({drug.manufacturer}) - ${drug.price.toFixed(2)} {drug.selected_amount}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>
            </div>
        </>
    );
}

export default ListDrugs;