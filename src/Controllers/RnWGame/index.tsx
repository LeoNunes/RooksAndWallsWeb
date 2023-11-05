import React from 'react';
import { GameData } from '../../Data/GameData/Model';
import { GameDataAction } from '../../Data/GameData/Actions';
import { GameDataProvider, useGameData, useGameDataDispatch } from '../../Data/GameData/GameDataProvider';
import BoardBase, { BoardBaseProps } from '../../Components/Board/BoardBase';
import addPieces from './addPieces';
import addWalls from './addWalls';
import addPiecePlacement from './addPiecePlacement';
import addWallPlacement from './addWallPlacement';
import addClickMovement from './addClickMovement';

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

function buildBoardComponent(gameData: GameData, gameDataDispatch: React.Dispatch<GameDataAction>): React.FC<BoardBaseProps> {
    let Board: React.FC<BoardBaseProps> = BoardBase;

    Board = addClickMovement(Board, gameData, gameDataDispatch);
    Board = addPiecePlacement(Board, gameData, gameDataDispatch);
    Board = addWalls(Board, gameData);
    Board = addPieces(Board, gameData);
    Board = addWallPlacement(Board, gameData, gameDataDispatch);
    
    return Board;
}
