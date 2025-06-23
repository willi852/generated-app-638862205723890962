import React, { useState } from 'react';
import '../styles/App.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: input }),
      });

      if (!response.ok) {
        throw new Error('Calculation failed');
      }

      const data = await response.json();
      setResult(data.result);
      setHistory([...history, { expression: input, result: data.result }]);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error');
    }
  };

  const buttons = [
    'C', '⌫', '(', ')', '±',
    'sin', 'cos', 'tan', '^', '√',
    '7', '8', '9', '/', 'π',
    '4', '5', '6', '*', 'e',
    '1', '2', '3', '-', 'ln',
    '0', '.', '=', '+', 'log'
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className={`btn ${btn === '=' ? 'equals' : ''}`}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.expression} = {item.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;