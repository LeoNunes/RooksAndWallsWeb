import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { isServerData } from './Data/RnWServer/Model';
import { ServerAction } from './Data/RnWServer/Actions';
import { useRnWData, useRnWDataDispatch } from './Data/RnW/RnWDataProvider';
import { useBoardData, useBoardDataDispatch } from './Data/BoardData/BoardDataProvider';
import { boardDispatcher } from './Data/BoardData/Actions';
import { boardRules, updateBoardElementsFromGameData, updateGameFromServer } from './GameRules_old';
import { rnwConfig, webSocketConfig } from './RnWConfig';
import Board from './Components/Board_old/Board';

type GameProps = {
    gameId: number;
};
export default function Game(props: GameProps) {
    const gameData = useRnWData();
    const gameDataDispatch = useRnWDataDispatch();
    const boardData = useBoardData();
    const boardDataDispatch = useBoardDataDispatch();
    const boardDataDispatcher = boardDispatcher(boardDataDispatch);

    const { lastMessage, lastJsonMessage, sendJsonMessage } = useWebSocket(webSocketConfig.urlForGame(props.gameId), {
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
        if (lastJsonMessage !== null && isServerData(lastJsonMessage)) {
            console.log('Message received', lastJsonMessage);
            updateGameFromServer(lastJsonMessage, gameDataDispatch);
        } else {
            console.log('Raw message received', lastMessage);
        }
    }, [lastJsonMessage, lastMessage]);

    function serverDispatch(action: ServerAction) { sendJsonMessage(action); }

    return (
        <Board rows={rnwConfig.boardSize.rows}
               columns={rnwConfig.boardSize.columns}
               eventHandlers={boardRules(gameData, boardData, gameDataDispatch, boardDataDispatcher, serverDispatch)}/>
    );
}