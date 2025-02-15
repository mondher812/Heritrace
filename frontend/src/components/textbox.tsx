// TextBox.tsx
import React, { useEffect, useState, useRef } from 'react';
import './textbox.css';

interface TextBoxProps {
  text: string;
  onChange: (newText: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ text, onChange }) => {
  const [labelText, setLabelText] = useState('');
  const fullLabelText = "Enter your last name";
  const indexRef = useRef(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
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

  const calculateWidth = () => {
    const baseWidth = 20;
    const additionalWidthPerCharacter = 10;
    return `${baseWidth + text.length * additionalWidthPerCharacter}px`;
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
        onChange={(e) => onChange(e.target.value)}
        style={{ width: calculateWidth() }}
      />
    </div>
  );
};

export default TextBox;