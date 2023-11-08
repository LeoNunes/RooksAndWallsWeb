import React from 'react';
import { AsyncDispatch } from '../../Data/Common/DataTypes';
import { RnWState } from '../../Data/RnW/Model';
import { RnWAction } from '../../Data/RnW/Actions';
import { RnWStateProvider, useRnWState, useRnWDispatch } from '../../Data/RnW/RnWDataProvider';
import BoardBase, { BoardBaseProps } from '../../Components/Board/BoardBase';
import addPieces from './addPieces';
import addWalls from './addWalls';
import addPiecePlacement from './addPiecePlacement';
import addWallPlacement from './addWallPlacement';
import addClickMovement from './addClickMovement';

export type RnWGameProps = RnWGameControllerProps;
export default function RnWGame(props: RnWGameProps) {
    return (
        <RnWStateProvider>
            <RnWGameController {...props} />
        </RnWStateProvider>
    );
}

type RnWGameControllerProps = {
    board: {
        rows: number;
        columns: number;
    };
};
function RnWGameController(props: RnWGameControllerProps) {
    const rnwState = useRnWState();
    const rnwDispatch = useRnWDispatch();

    const Board = buildBoardComponent(rnwState, rnwDispatch);
    return <Board rows={props.board.rows} columns={props.board.columns} haveEdges={true} />;
}

function buildBoardComponent(
    rnwState: RnWState,
    rnwDispatch: AsyncDispatch<RnWAction>,
): React.FC<BoardBaseProps> {
    let Board: React.FC<BoardBaseProps> = BoardBase;

    Board = addClickMovement(Board, rnwState, rnwDispatch);
    Board = addPiecePlacement(Board, rnwState, rnwDispatch);
    Board = addWalls(Board, rnwState);
    Board = addPieces(Board, rnwState);
    Board = addWallPlacement(Board, rnwState, rnwDispatch);

    return Board;
}
