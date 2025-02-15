import React from 'react';
import { useNavigate } from 'react-router-dom';
import './submit-button.css';

const SubmitButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/loading');
  };

  return (
    <button className="submit-button" type="button" onClick={handleClick}>
      Submit
    </button>
  );
};

export default SubmitButton;