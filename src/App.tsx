import React from 'react';
import Game from './Game';
import { GameDataProvider } from './Data/GameData/GameDataProvider';
import { BoardStateDataProvider } from './Data/BoardStateData/BoardStateDataProvider';
import './App.css';

function App() {
    return (
        <div className="App">
            <GameDataProvider>
                <BoardStateDataProvider>
                    <Game gameId={0}/>
                </BoardStateDataProvider>
            </GameDataProvider>
        </div>
    );
}

export default App;
