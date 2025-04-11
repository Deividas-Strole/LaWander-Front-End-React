// src/components/TravelPlanner.jsx
import React, { useState } from "react";
import EntryForm from "./EntryForm";
import SpecificPlacesMap from "./SpecificPlacesMap";

const TravelPlanner = () => {
  const [travelData, setTravelData] = useState(null);

  const handleFormSubmit = (data) => {
    setTravelData(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>LaWander ✈️ Travel Planner</h1>
      <EntryForm onFormSubmit={handleFormSubmit} />
      {travelData && <SpecificPlacesMap travelData={travelData} />}
    </div>
  );
};

export default TravelPlanner;
