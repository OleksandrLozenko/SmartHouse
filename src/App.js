import React from 'react';
import './App.css';

function App() {
  const handleTurnOn = () => {
    fetch('http://localhost:8000/turn_on')
      .then(response => response.json())
      .then(data => console.log("Response from backend:", data))
      .catch(error => console.error('Error:', error));
  };

  const handleTurnOff = () => {
    fetch('http://localhost:8000/turn_off')
      .then(response => response.json())
      .then(data => console.log("Response from backend:", data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleTurnOn}>Включить лампочку</button>
        <button onClick={handleTurnOff}>Выключить лампочку</button>
      </header>
    </div>
  );
}

export default App;
