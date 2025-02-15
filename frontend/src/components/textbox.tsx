import React, { useEffect, useState, useRef } from 'react';
import './textbox.css';

const TextBox: React.FC = () => {
  const [text, setText] = useState('');
  const [labelText, setLabelText] = useState('');
  const fullLabelText = "Enter your last name";
  const indexRef = useRef(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Full cleanup before starting new animation
    indexRef.current = 0;
    setLabelText('');
    
    const typingInterval = setInterval(() => {
      if (indexRef.current < fullLabelText.length) {
        setLabelText(fullLabelText.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
      indexRef.current = 0;
      setLabelText('');
      setIsTyping(true);
    };
  }, []);

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
      <label className="label" htmlFor="lastName">
        {labelText}
        {isTyping && <span className="cursor"></span>}
      </label>
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