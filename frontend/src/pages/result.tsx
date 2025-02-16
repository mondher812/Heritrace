import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./result.css";
import ImageGenerator from "../components/ImageGenerator";

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the response from the navigation state
  const { name, response } = location.state || {};

  // If the user accesses this page directly, redirect them to the home page
  if (!response || !name) {
    navigate("/");
    return null;
  }

  // Helper function to format object values into readable lists
  const renderObjectValues = (obj: Record<string, string> | string | null) => {
    if (!obj) return "N/A"; // Prevent crashes if data is missing
    if (typeof obj === "string") return obj; // If it's already a string, return as is
    return Object.entries(obj).map(([key, value]) => (
      <p key={key}><strong>{key}:</strong> {value}</p>
    ));
  };

  return (
    <div className="result-container">
      <h1>Results for "{name}"</h1>

      <div className="results">
        <ImageGenerator/>
        <p><strong>Country of Origin:</strong> {response.country || "N/A"}</p>
        <p><strong>Meaning:</strong> {response.meaning || "N/A"}</p>
        <p><strong>Popular Food:</strong> {renderObjectValues(response.food)}</p>
        <p><strong>Traditional Clothes:</strong> {renderObjectValues(response.clothes)}</p>
        <p><strong>Language Spoken:</strong> {renderObjectValues(response.language)}</p>
        <p><strong>Overall Summary:</strong> {response.summary || "N/A"}</p>
      </div>

      <div className="button-container">
        <button className="back-button" onClick={() => navigate("/")}>Go Back</button>
        <button 
          className="try-again-button" 
          onClick={() => navigate("/new-page", { state: { name } })}
        >
          Try Again?
        </button>
      </div>
    </div>
  );
};

export default Result;
