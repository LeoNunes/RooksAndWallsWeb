import React from 'react';
import Game from './Game';
import { GameDataProvider } from './Data/GameData/GameDataProvider';
import { BoardDataProvider } from './Data/BoardData/BoardDataProvider';
import './App.css';

function App() {
    const gameId = Number(Object.fromEntries(new URLSearchParams(window.location.search))['gameId']) || 0;
    return (
        <div className="App">
            <GameDataProvider>
                <BoardDataProvider>
                    <Game gameId={gameId}/>
                </BoardDataProvider>
            </GameDataProvider>
        </div>
    );
}

export default App;
