import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { isGameState } from './Data/GameWS/Model';
import { WSAction } from './Data/GameWS/Actions';
import { useGameData, useGameDataDispatch } from './Data/GameData/GameDataProvider';
import { useBoardStateData, useBoardStateDataDispatch } from './Data/BoardStateData/BoardStateDataProvider';
import { BoardRules, updateBoardElementsFromGameData, updateGameFromWebSocket } from './GameRules';
import { gameConfig, webSocketConfig } from './GameConfig';
import Board from './Components/Board/Board';

type GameProps = {
    gameId: number;
};
export default function Game(props: GameProps) {
    const gameData = useGameData();
    const gameDataDispatch = useGameDataDispatch();
    const boardStateData = useBoardStateData();
    const boardStateDataDispatch = useBoardStateDataDispatch();

    const { lastJsonMessage, sendJsonMessage } = useWebSocket(webSocketConfig.urlForGame(props.gameId), {
        onOpen() {
            console.log("Connected to websocket");
        },
    });

    useEffect(() => console.log("GameData", gameData), [gameData]);
    useEffect(() => console.log("BoardStateData", boardStateData), [boardStateData]);
    useEffect(
        () => updateBoardElementsFromGameData(gameData, boardStateDataDispatch)
    , [gameData.pieces, gameData.walls, boardStateDataDispatch]);
    useEffect(() => {
        if (lastJsonMessage !== null && isGameState(lastJsonMessage)) {
            updateGameFromWebSocket(lastJsonMessage, gameDataDispatch);
        }
    }, [lastJsonMessage, gameDataDispatch]);

    function websocketDispatch(action: WSAction) { sendJsonMessage(action); }

    return (
        <Board rows={gameConfig.boardSize.rows}
               columns={gameConfig.boardSize.columns}
               eventHandlers={BoardRules(gameData, boardStateData, gameDataDispatch, boardStateDataDispatch, websocketDispatch)}/>
    );
}
