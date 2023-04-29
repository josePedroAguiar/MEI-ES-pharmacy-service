import { useState } from "react";

function ListDrugs(props) {
  const [user, setUser] = useState(props.user);
  const [drugs, setDrugs] = useState([
    { id: 1, name: "Drug 1", manufacturer: "Manufacturer 1", price: 10.0 },
    { id: 2, name: "Drug 2", manufacturer: "Manufacturer 2", price: 20.0 },
    { id: 3, name: "Drug 3", manufacturer: "Manufacturer 3", price: 30.0 },
    { id: 4, name: "Drug 4", manufacturer: "Manufacturer 4", price: 40.0 },
    { id: 5, name: "Drug 5", manufacturer: "Manufacturer 5", price: 50.0 },
  ]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);

  const addToSelectedDrugs = (drug) => {
    setSelectedDrugs([...selectedDrugs, drug]);
  };

  const removeFromSelectedDrugs = (drug) => {
    setSelectedDrugs(selectedDrugs.filter((d) => d.id !== drug.id));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold">List of Drugs</h2>
          <ul className="menu bg-base-100 w-56 p-2 rounded-box">
            {drugs.map((drug) => (
              <li key={drug.id}>
                <a onClick={() => addToSelectedDrugs(drug)}>
                  {drug.name} ({drug.manufacturer}) - ${drug.price.toFixed(2)}
                </a>
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
                  {drug.name} ({drug.manufacturer}) - ${drug.price.toFixed(2)}
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