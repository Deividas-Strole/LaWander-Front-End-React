import React, { useState } from "react";
import SpecificPlacesMap from "./components/SpecificPlacesMap";
import EntryForm from "./components/EntryForm";
import "./App.css";

function App() {
  const [travelData, setTravelData] = useState(null);

  const handleFormSubmit = (data) => {
    setTravelData(data);
  };

  return (
    <div className="App">
      <h1>LaWander - the A.I. travel helper</h1>
      <EntryForm onFormSubmit={handleFormSubmit} />
      {travelData && <SpecificPlacesMap travelData={travelData} />}
    </div>
  );
}

export default App;
