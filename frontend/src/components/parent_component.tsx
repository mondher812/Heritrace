// ParentComponent.tsx
import React, { useState } from 'react';
import TextBox from './textbox';
import SubmitButton from './submit-button';

const ParentComponent: React.FC = () => {
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <TextBox text={lastName} onChange={setLastName} />
      <SubmitButton lastName={lastName} />
    </div>
  );
};

export default ParentComponent;