import React from 'react';
import { GameData } from '../../Data/GameData/Model';
import { GameDataAction } from '../../Data/GameData/Actions';
import { GameDataProvider, useGameData, useGameDataDispatch } from '../../Data/GameData/GameDataProvider';
import BoardBase, { BoardBaseProps } from '../../Components/Board/BoardBase';
import addClickMovement from './addClickMovement';
import addChessPieces from './addChessPieces';
import addPlacementMode from './addPlacementMode';
import addWalls from './addWalls';

export type RnWGameProps = RnWGameControllerProps;
export default function RnWGame(props: RnWGameProps) {
    return (
        <GameDataProvider>
            <RnWGameController {...props} />
        </GameDataProvider>
    );
}

type RnWGameControllerProps = {
    board: {
        rows: number,
        columns: number,
    },
};
function RnWGameController(props: RnWGameControllerProps) {
    const gameData = useGameData();
    const gameDataDispatch = useGameDataDispatch();

    const Board = buildBoardComponent(gameData, gameDataDispatch);
    return (
        <Board rows={props.board.rows}
               columns={props.board.columns}
               haveEdges={true}/>
    );
}

function buildBoardComponent(gameData: GameData, gameDataDispatch: React.Dispatch<GameDataAction>) {
    let Board: React.FC<BoardBaseProps> = BoardBase;

    Board = addClickMovement(Board, gameData, gameDataDispatch);
    Board = addPlacementMode(Board, gameData, gameDataDispatch);
    Board = addWalls(Board, gameData);
    Board = addChessPieces(Board, gameData);
    
    return Board;
}
