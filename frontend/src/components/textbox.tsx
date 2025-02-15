import React, { useState } from 'react';
import './textbox.css';

const TextBox: React.FC = () => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="text-box">
      <input
        type="text"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextBox;