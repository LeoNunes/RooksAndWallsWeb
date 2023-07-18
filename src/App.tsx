import React from 'react';
import Game from './Game';
import { GameDataProvider } from './Data/GameData/GameDataProvider';
import { BoardDataProvider } from './Data/BoardData/BoardDataProvider';
import './App.css';

function App() {
    return (
        <div className="App">
            <GameDataProvider>
                <BoardDataProvider>
                    <Game gameId={0}/>
                </BoardDataProvider>
            </GameDataProvider>
        </div>
    );
}

export default App;
