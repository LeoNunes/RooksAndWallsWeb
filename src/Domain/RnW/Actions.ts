import type { EdgeCoordinate, SquareCoordinate } from "Domain/Common/Coordinates";
import type { AsyncAction, Dispatch } from "Domain/Common/DataTypes";
import { addPieceAction, moveAction, type RnWGameAction as ServerGameAction } from "Services/RnWServer/Actions";
import type { RnWGameState as ServerGameState } from "Services/RnWServer/Data";
import type { Piece, Player, RnWState } from "./Model";

export type RnWBaseAction =
    | AddPieceActionType
    | AddWallActionType
    | MovePieceActionType
    | UpdateFromServerActionType
    | SetNextMovePieceMovement
    | SetNextMoveWallPlacement
    | ResetNextMove;

export type RnWAction = AsyncAction<RnWBaseAction, RnWState>;
export type RnWDispatch = Dispatch<RnWAction>;

export type RnWActions = ReturnType<typeof createAction>;
export function createAction(dispatch: RnWDispatch) {
    return {
        addPiece: (owner: Player, position: SquareCoordinate, websocketDispatch: Dispatch<ServerGameAction>) => {
            dispatch(addPiece(owner, position, websocketDispatch));
        },
        setNextMovePieceMovement: (piece: Piece, position: SquareCoordinate) => {
            dispatch(setNextMovePieceMovement(piece, position));
        },
        setNextMoveWallPlacement: (position: EdgeCoordinate) => {
            dispatch(setNextMoveWallPlacement(position));
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
    type: "add-piece";
    owner: Player;
    position: SquareCoordinate;
};
function addPieceBase(owner: Player, position: SquareCoordinate): AddPieceActionType {
    return {
        type: "add-piece",
        owner: owner,
        position: position,
    };
}
export function addPiece(
    owner: Player,
    position: SquareCoordinate,
    websocketDispatch: Dispatch<ServerGameAction>,
): RnWAction {
    return (dispatch) => {
        dispatch(addPieceBase(owner, position));
        websocketDispatch(addPieceAction(position));
    };
}

export type MovePieceActionType = {
    type: "move-piece";
    piece: Piece;
    newPosition: SquareCoordinate;
};
function movePiece(piece: Piece, newPosition: SquareCoordinate): MovePieceActionType {
    return {
        type: "move-piece",
        piece: piece,
        newPosition: newPosition,
    };
}

export type AddWallActionType = {
    type: "add-wall";
    position: EdgeCoordinate;
};
function addWall(position: EdgeCoordinate): AddWallActionType {
    return {
        type: "add-wall",
        position: position,
    };
}

export type SetNextMovePieceMovement = {
    type: "set-next-move-piece-movement";
    piece: Piece;
    position: SquareCoordinate;
};
export function setNextMovePieceMovement(piece: Piece, position: SquareCoordinate): SetNextMovePieceMovement {
    return {
        type: "set-next-move-piece-movement",
        piece,
        position,
    };
}

export type SetNextMoveWallPlacement = {
    type: "set-next-move-wall-placement";
    position: EdgeCoordinate;
};
export function setNextMoveWallPlacement(position: EdgeCoordinate): SetNextMoveWallPlacement {
    return {
        type: "set-next-move-wall-placement",
        position,
    };
}

export type ResetNextMove = {
    type: "reset-next-move";
};
function resetNextMove(): ResetNextMove {
    return {
        type: "reset-next-move",
    };
}

export function commitMove(websocketDispatch: Dispatch<ServerGameAction>): RnWAction {
    return (dispatch, getState) => {
        const { nextMove } = getState();

        if (nextMove.wallPlacement === undefined) {
            console.error("Cannot process commitMove action: wall placement is missing");
            return;
        }

        const wallPosition = nextMove.wallPlacement.position;

        if (nextMove.pieceMovement !== undefined) {
            dispatch(movePiece(nextMove.pieceMovement.piece, nextMove.pieceMovement.position));
            dispatch(addWall(wallPosition));
            dispatch(resetNextMove());
            websocketDispatch(
                moveAction(wallPosition, {
                    pieceId: nextMove.pieceMovement.piece.id,
                    position: nextMove.pieceMovement.position,
                }),
            );
        } else {
            dispatch(addWall(wallPosition));
            dispatch(resetNextMove());
            websocketDispatch(moveAction(wallPosition));
        }
    };
}

export type UpdateFromServerActionType = {
    type: "update-from-server";
    serverState: ServerGameState;
};
export function updateFromServer(state: ServerGameState): UpdateFromServerActionType {
    return {
        type: "update-from-server",
        serverState: state,
    };
}
