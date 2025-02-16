import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGptResponse } from '../api/gpt';

interface SubmitButtonProps {
  name: string;
  continent?: string | null;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ name, continent }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!name.trim()) {
      alert("Please enter a valid name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch response (continent is optional)
      const response = await fetchGptResponse(name, continent || undefined);

      // Navigate to /result with name and response
      navigate("/result", { state: { name, response } });
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      setError("Failed to fetch data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <button 
        className="submit-button" 
        onClick={handleClick} 
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>

      {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SubmitButton;
