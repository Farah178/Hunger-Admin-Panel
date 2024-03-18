// DynamicInputsComponent.jsx

import React, { useState } from 'react';
import '../../screens/Settings/settings.css'

const InputField = ({ inputsData, onInputChange }) => {
  const [inputValues, setInputValues] = useState({});
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e, inputName) => {
    const value = e.target.value;
    setInputValues({ ...inputValues, [inputName]: value });

    if (inputName === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        
        setPasswordError('Password must be 8+ characters with at least one uppercase, one lowercase, one number, and one special character.');
      } else {
        setPasswordError('');
        console.log(setPasswordError,'setPasswordError===>')
      }
    }

    // Invoke the callback function with the updated input values
    onInputChange({ ...inputValues, [inputName]: value });
  };


  return (
    <div>
    
      
      {inputsData.map((input, index) => (
        <div className="input__wrapper" style={{ width: input.width || '100%' }} key={index}>
          <input
            type={input.type || 'text'} // Default type is 'text'
            placeholder={input.placeholder || 'Placeholder'}
            className="input__field"
            onChange={(e) => handleInputChange(e, input.name)}
            style={{ width: input.width || '100%' }}
          />
          <label htmlFor={input.name} className="input__label">
            {input.placeholder || 'Placeholder'}
          </label>
        </div>
      ))}
      {passwordError && <p className="error">{passwordError}</p>}
    </div>
 
   
  );
};

export default InputField;
