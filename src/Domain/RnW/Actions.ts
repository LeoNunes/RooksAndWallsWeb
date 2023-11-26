import { Piece, RnWState } from './Model';
import { SquareCoordinate, EdgeCoordinate } from '../Common/Coordinates';
import { AsyncAction, Dispatch } from '../Common/DataTypes';
import { RnWGameState as ServerGameState } from '../../Services/RnWServer/Data';
import {
    RnWGameAction as ServerGameAction,
    addPieceAction,
    moveAction,
} from '../../Services/RnWServer/Actions';

export type RnWBaseAction =
    | AddPieceActionType
    | AddWallActionType
    | MovePieceActionType
    | UpdateFromServerActionType
    | SetNextMovePiece
    | SetNextMoveWall
    | ResetNextMove;

export type RnWAction = AsyncAction<RnWBaseAction, RnWState>;
export type RnWDispatch = Dispatch<RnWAction>;

export type RnWActions = ReturnType<typeof createAction>;
export function createAction(dispatch: RnWDispatch) {
    return {
        addPiece: (
            owner: number,
            position: SquareCoordinate,
            websocketDispatch: Dispatch<ServerGameAction>,
        ) => {
            dispatch(addPiece(owner, position, websocketDispatch));
        },
        setNextMovePiece: (piece: Piece, position: SquareCoordinate) => {
            dispatch(setNextMovePiece(piece, position));
        },
        setNextMoveWall: (position: EdgeCoordinate) => {
            dispatch(setNextMoveWall(position));
        },
        commitMove: (websocketDispatch: Dispatch<ServerGameAction>) => {
            dispatch(commitMove(websocketDispatch));
        },
        updateFromServer: (state: ServerGameState) => {
            dispatch(updateFromServer(state));
        },
    };
}

export type AddPieceActionType = {
    type: 'add-piece';
    owner: number;
    position: SquareCoordinate;
};
function addPieceBase(owner: number, position: SquareCoordinate): AddPieceActionType {
    return {
        type: 'add-piece',
        owner: owner,
        position: position,
    };
}
export function addPiece(
    owner: number,
    position: SquareCoordinate,
    websocketDispatch: Dispatch<ServerGameAction>,
): RnWAction {
    return function (dispatch) {
        dispatch(addPieceBase(owner, position));
        websocketDispatch(addPieceAction(position));
    };
}

export type MovePieceActionType = {
    type: 'move-piece';
    piece: Piece;
    newPosition: SquareCoordinate;
};
function movePiece(piece: Piece, newPosition: SquareCoordinate): MovePieceActionType {
    return {
        type: 'move-piece',
        piece: piece,
        newPosition: newPosition,
    };
}

export type AddWallActionType = {
    type: 'add-wall';
    position: EdgeCoordinate;
};
function addWall(position: EdgeCoordinate): AddWallActionType {
    return {
        type: 'add-wall',
        position: position,
    };
}

export type SetNextMovePiece = {
    type: 'set-next-move-piece';
    piece: Piece;
    position: SquareCoordinate;
};
export function setNextMovePiece(piece: Piece, position: SquareCoordinate): SetNextMovePiece {
    return {
        type: 'set-next-move-piece',
        piece: piece,
        position: position,
    };
}

export type SetNextMoveWall = {
    type: 'set-next-move-wall';
    position: EdgeCoordinate;
};
export function setNextMoveWall(position: EdgeCoordinate): SetNextMoveWall {
    return {
        type: 'set-next-move-wall',
        position: position,
    };
}

export type ResetNextMove = {
    type: 'reset-next-move';
};
function resetNextMove(): ResetNextMove {
    return {
        type: 'reset-next-move',
    };
}

export function commitMove(websocketDispatch: Dispatch<ServerGameAction>): RnWAction {
    return function (dispatch, getState) {
        const { nextMove } = getState();

        if (
            nextMove === undefined ||
            nextMove.piece === undefined ||
            nextMove.piecePosition === undefined ||
            nextMove.wallPosition === undefined
        ) {
            console.error('Cannot proccess commitMove action: Invalid state');
            return;
        }

        dispatch(movePiece(nextMove.piece, nextMove.piecePosition));
        dispatch(addWall(nextMove.wallPosition));
        dispatch(resetNextMove());
        websocketDispatch(
            moveAction(nextMove.piece.id, nextMove.piecePosition, nextMove.wallPosition),
        );
    };
}

export type UpdateFromServerActionType = {
    type: 'update-from-server';
    serverState: ServerGameState;
};
export function updateFromServer(state: ServerGameState): UpdateFromServerActionType {
    return {
        type: 'update-from-server',
        serverState: state,
    };
}
