import React, { useState } from 'react';
import './App.css';
import { FaClipboard } from 'react-icons/fa';

function App() {
  // State variables
  const [length, setLength] = useState(20);
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasLowercase, setHasLowercase] = useState(true);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(true);
  const [password, setPassword] = useState('');

  // Random function for generating characters
  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  // Generate password function
  const generatePassword = () => {
    let generatedPassword = '';
    const typesCount = hasLowercase + hasUppercase + hasNumbers + hasSymbols;

    // Create an array with active types
    const typesArr = [
      { lower: hasLowercase },
      { upper: hasUppercase },
      { number: hasNumbers },
      { symbol: hasSymbols },
    ].filter((item) => Object.values(item)[0]);

    // If no options are selected, return empty string
    if (typesCount === 0) return '';

    // Create password by iterating over the length
    for (let i = 0; i < length; i++) {
      // Randomly pick a type from the filtered types array
      const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
      const funcName = Object.keys(randomType)[0];
      generatedPassword += randomFunc[funcName](); // Add character to password
    }

    const finalPassword = generatedPassword.slice(0, length);
    setPassword(finalPassword); // Update state with the generated password
  };

  // Clipboard copy function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="container">
      <h2>Password Generator</h2>

      {/* Result section */}
      <div className="result-container">
        <span id="result">{password}</span>
        <button className="btn" onClick={copyToClipboard}>
          <FaClipboard />
        </button>
      </div>

      {/* Settings section */}
      <div className="settings">
        <div className="setting">
          <label>Password Length</label>
          <input
            type="number"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="setting">
          <label>Include uppercase letters</label>
          <input
            type="checkbox"
            checked={hasUppercase}
            onChange={() => setHasUppercase(!hasUppercase)}
          />
        </div>
        <div className="setting">
          <label>Include lowercase letters</label>
          <input
            type="checkbox"
            checked={hasLowercase}
            onChange={() => setHasLowercase(!hasLowercase)}
          />
        </div>
        <div className="setting">
          <label>Include numbers</label>
          <input
            type="checkbox"
            checked={hasNumbers}
            onChange={() => setHasNumbers(!hasNumbers)}
          />
        </div>
        <div className="setting">
          <label>Include symbols</label>
          <input
            type="checkbox"
            checked={hasSymbols}
            onChange={() => setHasSymbols(!hasSymbols)}
          />
        </div>
      </div>

      {/* Generate password button */}
      <button className="btn btn-large" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
}

// Helper functions for generating random characters
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // a-z
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // A-Z
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // 0-9
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'; 
  return symbols[Math.floor(Math.random() * symbols.length)];
}

export default App;
