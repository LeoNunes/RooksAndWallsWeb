import React from 'react';
import RnWGame from './Controllers/RnWGame';
import './App.css';

function App() {
    // eslint-disable-next-line
    const gameId = Number(Object.fromEntries(new URLSearchParams(window.location.search))['gameId']) || 0;

    return (
        <div className="App">
            <h1>Rooks And Walls</h1>
            <RnWGame />
        </div>
    );
}

export default App;
