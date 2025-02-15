import React, { useEffect, useState } from 'react';
import './textbox.css';

const TextBox: React.FC = () => {
  const [text, setText] = useState('');
  const [labelText, setLabelText] = useState('');
  const fullLabelText = "Enter your last name"; // Full label text

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullLabelText.length) {
        setLabelText((prev) => prev + fullLabelText[index]);
        index++;
      } else {
        clearInterval(typingInterval); // Stop the interval when done
      }
    }, 100); // Adjust typing speed here (in milliseconds)

    return () => clearInterval(typingInterval); // Cleanup on unmount
  }, [fullLabelText]); // Add fullLabelText to dependency array

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // Calculate the width based on the text length, starting very small
  const calculateWidth = () => {
    const baseWidth = 20; // Start with a very small base width to fit 1 character
    const additionalWidthPerCharacter = 10; // Width added per character
    const newWidth = baseWidth + text.length * additionalWidthPerCharacter;
    return `${newWidth}px`;
  };

  return (
    <div className="form__group">
      <label className="label" htmlFor="lastName">{labelText}</label>
      <input
        type="text"
        className="form__field"
        name="lastName"
        id="lastName"
        required
        value={text}
        onChange={handleChange}
        style={{ width: calculateWidth() }} // Use the calculateWidth function
      />
    </div>
  );
};

export default TextBox;