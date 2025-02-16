import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGptResponse } from '../api/gpt';

interface SubmitButtonProps {
  name: string;
  continent?: string | null;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ name, continent }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!name.trim()) {
      alert("Please enter a valid name.");
      return;
    }

    // Navigate to loading screen immediately
    navigate("/loading", { state: { name, continent } });

    setError(null);

    try {
      const response = await fetchGptResponse(name, continent || undefined);
      // Update the state with the response
      navigate("/result", { state: { name, response }, replace: true });
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      setError("Failed to fetch data. Please try again.");
      // Go back to previous page on error
      navigate(-1);
    }
  };

  return (
    <div>
      <button 
        className="submit-button" 
        onClick={handleClick} 
      >
        Submit
      </button>

      {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SubmitButton;
