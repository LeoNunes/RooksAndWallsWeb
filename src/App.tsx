import React from 'react';
import RnWGame from './Controllers/RnWGame';
import { rnwConfig } from './RnWConfig';
import './App.css';

function App() {
    const gameId =
        Number(Object.fromEntries(new URLSearchParams(window.location.search))['gameId']) || 0;

    return (
        <div className='App'>
            <h1>Rooks And Walls</h1>
            <RnWGame gameId={gameId} board={rnwConfig.boardSize} />
        </div>
    );
}

export default App;
