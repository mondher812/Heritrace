import React, { useState } from 'react';
import TextBox from '../components/textbox';
import SubmitButton from '../components/submit-button';
import './landing.css'; // or your styling

function Landing() {
  // State for the name
  const [name, setName] = useState('');

  return (
    <div className="landing-page">
      <header className="landing-header">
        <TextBox text={name} onChange={setName} />
        <SubmitButton name={name} />
      </header>
    </div>
  );
}

export default Landing;

