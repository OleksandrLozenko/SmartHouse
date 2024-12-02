import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => console.log('Light ON')}>Включить лампочку</button>
        <button onClick={() => console.log('Light OFF')}>Выключить лампочку</button>
      </header>
    </div>
  );
}

export default App;
