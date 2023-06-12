import React from 'react';
import { GameDataProvider } from './Data/GameData/GameDataProvider';
import { BoardStateDataProvider } from './Data/BoardStateData/BoardStateDataProvider';
import Board from './Components/Board/Board';

type GameProps = {};
export default function Game(props: GameProps) {
    return (
        <GameDataProvider>
            <BoardStateDataProvider>
                <Board columns={8} rows={8}/>
            </BoardStateDataProvider>
        </GameDataProvider>
    );
}