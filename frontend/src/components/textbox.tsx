import { useEffect, useState, useRef } from 'react';

import './textbox.css';

interface TextBoxProps {
  text: string;
  onChange: (newText: string) => void;
}

export default function TextBox({ text, onChange }: TextBoxProps) {
  const [labelText, setLabelText] = useState('');
  const fullLabelText = "Enter your name!";
  const indexRef = useRef(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (indexRef.current < fullLabelText.length) {
          setLabelText(fullLabelText.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 100);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      indexRef.current = 0;
      setLabelText('');
      setIsTyping(true);
    };
  }, [fullLabelText]);

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
      />
    </div>
  );
}