import { Piece } from './Model';
import { SquareCoordinate, EdgeCoordinate } from '../Common/Coordinates';
import { ServerData } from '../RnWServer/Model';

export type RnWAction =
    | AddPieceActionType
    | AddWallActionType
    | MovePieceActionType
    | UpdateFromServerActionType
    | SetNextMovePiece
    | SetNextMoveWall
    | ResetNextMove;

export type AddPieceActionType = {
    type: 'add-piece';
    owner: number;
    position: SquareCoordinate;
};
export function addPieceActionCreator(
    owner: number,
    position: SquareCoordinate,
): AddPieceActionType {
    return {
        type: 'add-piece',
        owner: owner,
        position: position,
    };
}
export type MovePieceActionType = {
    type: 'move-piece';
    piece: Piece;
    newPosition: SquareCoordinate;
};
export function movePieceActionCreator(
    piece: Piece,
    newPosition: SquareCoordinate,
): MovePieceActionType {
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
export function addWallActionCreator(position: EdgeCoordinate): AddWallActionType {
    return {
        type: 'add-wall',
        position: position,
    };
}

export type UpdateFromServerActionType = {
    type: 'update-from-server';
    serverData: ServerData;
};
export function updateFromServerActionCreator(data: ServerData): UpdateFromServerActionType {
    return {
        type: 'update-from-server',
        serverData: data,
    };
}

export type SetNextMovePiece = {
    type: 'set-next-move-piece';
    piece: Piece;
    position: SquareCoordinate;
};
export function setNextMovePieceActionCreator(
    piece: Piece,
    position: SquareCoordinate,
): SetNextMovePiece {
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
export function setNextMoveWallActionCreator(position: EdgeCoordinate): SetNextMoveWall {
    return {
        type: 'set-next-move-wall',
        position: position,
    };
}

export type ResetNextMove = {
    type: 'reset-next-move';
};
export function resetNextMoveActionCreator(): ResetNextMove {
    return {
        type: 'reset-next-move',
    };
}
