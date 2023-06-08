import React from 'react';
import { GameDataProvider } from './Data/GameData/GameDataProvider';
import Board from './Components/Board/Board';

type GameProps = {};

export default function Game(props: GameProps) {
    return (
        <GameDataProvider>
            <Board columns={8} rows={8}/>
        </GameDataProvider>
    );
}