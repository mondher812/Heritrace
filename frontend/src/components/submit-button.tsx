// SubmitButton.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './submit-button.css';
import { fetchGptResponse } from '../../openai/gpt';

interface SubmitButtonProps {
  lastName: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ lastName }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!lastName || lastName.trim() === "") {
      setMessage("Please enter a valid name.");
      return;
    }
    navigate('/loading'); // if needed
    setLoading(true);
    try {
      const content = await fetchGptResponse(lastName);
      setMessage(content);
    } catch (error) {
      console.error(error);
      setMessage("Error fetching message");
    }
    setLoading(false);
  };

  return (
    <div>
      <button className="submit-button" type="button" onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
      {message && <div className="gpt-response"><p>{message}</p></div>}
    </div>
  );
};

export default SubmitButton;