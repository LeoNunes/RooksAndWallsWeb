import React from 'react';
import { AsyncDispatch } from '../../Data/Common/DataTypes';
import { RnWState } from '../../Data/RnW/Model';
import { RnWAction, updateFromServerActionCreator } from '../../Data/RnW/Actions';
import { RnWStateProvider, useRnWState, useRnWDispatch } from '../../Data/RnW/RnWDataProvider';
import { ServerState } from '../../Services/RnWServer/Data';
import { useRnWWebsocket } from '../../Services/RnWServer/useRnWWebsocket';
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
    gameId: number;
    board: {
        rows: number;
        columns: number;
    };
};
function RnWGameController(props: RnWGameControllerProps) {
    const rnwState = useRnWState();
    const rnwDispatch = useRnWDispatch();

    function onWebsocketUpdate(state: ServerState) {
        rnwDispatch(updateFromServerActionCreator(state));
    }
    const websocketDispatch = useRnWWebsocket(props.gameId, onWebsocketUpdate);

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
