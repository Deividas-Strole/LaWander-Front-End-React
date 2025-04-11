// src/components/EntryForm.jsx
import React, { useState } from "react";
import "./EntryForm.css";

const EntryForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    currentCity: "",
    destination: "",
    days: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Received from backend:", data);

      if (onFormSubmit) {
        onFormSubmit(data);
      }

      setFormData({
        currentCity: "",
        destination: "",
        days: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="entry-form-container">
      <form onSubmit={handleSubmit} className="entry-form">
        <div className="form-group">
          <input
            type="text"
            name="currentCity"
            value={formData.currentCity}
            onChange={handleChange}
            placeholder="Enter your current city"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter your destination"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            placeholder="Enter number of days"
            min="1"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Go LaaaaaWaaaaaander! :)
        </button>
      </form>
    </div>
  );
};

export default EntryForm;
