import React from 'react';
import './App.css';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <Board columns={8} rows={8}/>
    </div>
  );
}

export default App;
