import React from 'react';
import { Dispatch } from '../../Domain/Common/DataTypes';
import { RnWModel, createModel } from '../../Domain/RnW/Model';
import { RnWActions, createAction } from '../../Domain/RnW/Actions';
import { RnWStateProvider, useRnWState, useRnWDispatch } from '../../Domain/RnW/RnWDataProvider';
import { ServerAction, ServerState } from '../../Services/RnWServer/Data';
import { useRnWWebsocket } from '../../Services/RnWServer/useRnWWebsocket';
import BoardBase, { BoardBaseProps } from '../../Components/Board/BoardBase';
import addPieces from './addPieces';
import addWalls from './addWalls';
import addLastMoveHighlight from './addLastMoveHighlight';
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
    const rnwModel = createModel(rnwState);
    const rnwActions = createAction(rnwDispatch);

    function onWebsocketUpdate(state: ServerState) {
        rnwActions.updateFromServer(state);
    }
    const websocketDispatch = useRnWWebsocket(props.gameId, onWebsocketUpdate);

    const Board = buildBoardComponent(rnwModel, rnwActions, websocketDispatch);
    return <Board rows={props.board.rows} columns={props.board.columns} haveEdges={true} />;
}

function buildBoardComponent(
    rnwModel: RnWModel,
    rnwActions: RnWActions,
    websocketDispatch: Dispatch<ServerAction>,
): React.FC<BoardBaseProps> {
    let Board: React.FC<BoardBaseProps> = BoardBase;

    Board = addWallPlacement(Board, rnwModel, rnwActions, websocketDispatch);
    Board = addClickMovement(Board, rnwModel, rnwActions);
    Board = addPiecePlacement(Board, rnwModel, rnwActions, websocketDispatch);
    Board = addLastMoveHighlight(Board, rnwModel);
    Board = addWalls(Board, rnwModel);
    Board = addPieces(Board, rnwModel);

    return Board;
}
