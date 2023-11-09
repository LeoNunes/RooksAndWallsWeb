import React from 'react';
import { Dispatch } from '../../Data/Common/DataTypes';
import { RnWState } from '../../Data/RnW/Model';
import { RnWDispatch, updateFromServer } from '../../Data/RnW/Actions';
import { RnWStateProvider, useRnWState, useRnWDispatch } from '../../Data/RnW/RnWDataProvider';
import { ServerAction, ServerState } from '../../Services/RnWServer/Data';
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
        rnwDispatch(updateFromServer(state));
    }
    const websocketDispatch = useRnWWebsocket(props.gameId, onWebsocketUpdate);

    const Board = buildBoardComponent(rnwState, rnwDispatch, websocketDispatch);
    return <Board rows={props.board.rows} columns={props.board.columns} haveEdges={true} />;
}

function buildBoardComponent(
    rnwState: RnWState,
    rnwDispatch: RnWDispatch,
    websocketDispatch: Dispatch<ServerAction>,
): React.FC<BoardBaseProps> {
    let Board: React.FC<BoardBaseProps> = BoardBase;

    Board = addClickMovement(Board, rnwState, rnwDispatch);
    Board = addPiecePlacement(Board, rnwState, rnwDispatch, websocketDispatch);
    Board = addWalls(Board, rnwState);
    Board = addPieces(Board, rnwState);
    Board = addWallPlacement(Board, rnwState, rnwDispatch, websocketDispatch);

    return Board;
}
