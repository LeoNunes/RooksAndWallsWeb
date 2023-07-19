import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { isGameState } from './Data/ServerData/Model';
import { ServerAction } from './Data/ServerData/Actions';
import { useGameData, useGameDataDispatch } from './Data/GameData/GameDataProvider';
import { useBoardData, useBoardDataDispatch } from './Data/BoardData/BoardDataProvider';
import { boardDispatcher } from './Data/BoardData/Actions';
import { boardRules, updateBoardElementsFromGameData, updateGameFromServer } from './GameRules';
import { gameConfig, webSocketConfig } from './GameConfig';
import Board from './Components/Board/Board';

type GameProps = {
    gameId: number;
};
export default function Game(props: GameProps) {
    const gameData = useGameData();
    const gameDataDispatch = useGameDataDispatch();
    const boardData = useBoardData();
    const boardDataDispatch = useBoardDataDispatch();
    const boardDataDispatcher = boardDispatcher(boardDataDispatch);

    const { lastJsonMessage, sendJsonMessage } = useWebSocket(webSocketConfig.urlForGame(props.gameId), {
        onOpen() {
            console.log("Connected to websocket");
        },
        onClose() {
            console.log("Disconnected from websocket");
        }
    });

    useEffect(() => console.log("GameData", gameData), [gameData]);
    useEffect(() => console.log("BoardStateData", boardData), [boardData]);

    useEffect(() => updateBoardElementsFromGameData(gameData, boardDataDispatcher), [gameData]);
    useEffect(() => {
        if (lastJsonMessage !== null && isGameState(lastJsonMessage)) {
            console.log('Message received', lastJsonMessage);
            updateGameFromServer(lastJsonMessage, gameDataDispatch);
        }
    }, [lastJsonMessage]);

    function websocketDispatch(action: ServerAction) { sendJsonMessage(action); }

    return (
        <Board rows={gameConfig.boardSize.rows}
               columns={gameConfig.boardSize.columns}
               eventHandlers={boardRules(gameData, boardData, gameDataDispatch, boardDataDispatcher, websocketDispatch)}/>
    );
}
