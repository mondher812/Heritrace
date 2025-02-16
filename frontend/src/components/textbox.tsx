import React from 'react';
import './textbox.css';
interface TextBoxProps {
  text: string;
  onChange: (newText: string) => void;
}
const TextBox: React.FC<TextBoxProps> = ({ text, onChange }) => {
  return (
    <div className="form__group">
      <label className="label" htmlFor="lastName">
        Enter your last name
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
};
export default TextBox;