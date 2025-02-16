import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './new_page.css'; // New CSS file for the new page
import SubmitButton from '../components/submit-button';
import WorldMap from '../components/WorldMap'; // Import the WorldMap component

const NewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || {};
  const [continent, setContinent] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1 className="new-page-title">Select a Continent</h1>

        {/* World map - updates continent state */}
        <WorldMap onContinentSelect={setContinent} />

        {/* Submit button sends the name + continent to ChatGPT */}
        <div className="submit-button-container">
          <SubmitButton name={name} continent={continent} />
        </div>
      </header>
    </div>
  );
};

export default NewPage;