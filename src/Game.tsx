import React from 'react';
import { GameDataProvider } from './GameData/GameDataProvider';
import Board from './Board';

type GameProps = {};

export default function Game(props: GameProps) {
    return (
        <GameDataProvider>
            <Board columns={8} rows={8}/>
        </GameDataProvider>
    );
}