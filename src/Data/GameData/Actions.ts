import { GamePiece } from './Model';
import { SquareCoordinate, EdgeCoordinate } from '../Common/Coordinates';
import { ServerData } from '../ServerData/Model';

export type GameDataAction =
    MovePieceActionType |
    AddWallActionType |
    UpdateFromServerActionType |
    SetNextMovePiece |
    SetNextMoveWall |
    ResetNextMove;

export type MovePieceActionType = {
    type: 'move-piece';
    piece: GamePiece;
    newPosition: SquareCoordinate;
};
export function movePieceActionCreator(piece: GamePiece, newPosition: SquareCoordinate): MovePieceActionType {
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
    piece: GamePiece;
    position: SquareCoordinate;
};
export function setNextMovePieceActionCreator(piece: GamePiece, position: SquareCoordinate): SetNextMovePiece {
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
