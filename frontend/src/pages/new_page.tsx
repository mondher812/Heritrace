import { useState } from 'react';
import './new_page.css';
import TextBox from '../components/textbox';
import SubmitButton from '../components/submit-button';
import WorldMap from '../components/WorldMap';

export default function NewPage() {
  const [text, setText] = useState('');

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1 className="logo">GOT IT WRONG? HELP US OUT</h1>
        <div className="textbox-container">
          <TextBox text={text} onChange={setText} />
        </div>
        <WorldMap />
        <div className="submit-button-container">
          <SubmitButton lastName={text} />
        </div>
      </header>
    </div>
  );
} 