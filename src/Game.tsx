import React, { useEffect } from 'react';
import { useGameData, useGameDataDispatch } from './Data/GameData/GameDataProvider';
import { useBoardStateData, useBoardStateDataDispatch } from './Data/BoardStateData/BoardStateDataProvider';
import { BoardRules, updateBoardElementsFromGameData } from './GameRules';
import GameConfig from './GameConfig';
import Board from './Components/Board/Board';

type GameProps = {};
export default function Game(props: GameProps) {
    const gameData = useGameData();
    const gameDataDispatch = useGameDataDispatch();
    const boardStateData = useBoardStateData();
    const boardStateDataDispatch = useBoardStateDataDispatch();

    useEffect(() => console.log("GameData", gameData), [gameData]);
    useEffect(() => console.log("BoardStateData", boardStateData), [boardStateData]);
    useEffect(
        () => updateBoardElementsFromGameData(gameData, boardStateDataDispatch)
    , [gameData.pieces, gameData.walls]);

    return (
        <Board rows={GameConfig.boardSize.rows}
               columns={GameConfig.boardSize.columns}
               eventHandlers={BoardRules(gameData, boardStateData, gameDataDispatch, boardStateDataDispatch)}/>
    );
}
