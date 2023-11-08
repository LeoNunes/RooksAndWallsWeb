import React from 'react';
import { RnWData } from '../../Data/RnW/Model';
import { RnWAction } from '../../Data/RnW/Actions';
import { RnWDataProvider, useRnWData, useRnWDataDispatch } from '../../Data/RnW/RnWDataProvider';
import BoardBase, { BoardBaseProps } from '../../Components/Board/BoardBase';
import addPieces from './addPieces';
import addWalls from './addWalls';
import addPiecePlacement from './addPiecePlacement';
import addWallPlacement from './addWallPlacement';
import addClickMovement from './addClickMovement';

export type RnWGameProps = RnWGameControllerProps;
export default function RnWGame(props: RnWGameProps) {
    return (
        <RnWDataProvider>
            <RnWGameController {...props} />
        </RnWDataProvider>
    );
}

type RnWGameControllerProps = {
    board: {
        rows: number,
        columns: number,
    },
};
function RnWGameController(props: RnWGameControllerProps) {
    const rnwData = useRnWData();
    const rnwDataDispatch = useRnWDataDispatch();

    const Board = buildBoardComponent(rnwData, rnwDataDispatch);
    return (
        <Board rows={props.board.rows}
               columns={props.board.columns}
               haveEdges={true}/>
    );
}

function buildBoardComponent(rnwData: RnWData, rnwDataDispatch: React.Dispatch<RnWAction>): React.FC<BoardBaseProps> {
    let Board: React.FC<BoardBaseProps> = BoardBase;

    Board = addClickMovement(Board, rnwData, rnwDataDispatch);
    Board = addPiecePlacement(Board, rnwData, rnwDataDispatch);
    Board = addWalls(Board, rnwData);
    Board = addPieces(Board, rnwData);
    Board = addWallPlacement(Board, rnwData, rnwDataDispatch);
    
    return Board;
}
