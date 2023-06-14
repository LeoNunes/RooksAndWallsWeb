import { Piece, SquareCoordinate, EdgeCoordinate } from "./Model";

export type GameDataAction = MovePieceActionType | AddWallActionType;

export type MovePieceActionType = {
    type: 'move-piece',
    piece: Piece,
    newPosition: SquareCoordinate,
};
export function movePieceActionCreator(piece: Piece, newPosition: SquareCoordinate) : MovePieceActionType {
    return {
        type: 'move-piece',
        piece: piece,
        newPosition: newPosition,
    };
}

export type AddWallActionType = {
    type: 'add-wall',
    position: EdgeCoordinate,
};
export function addWallActionCreator(position: EdgeCoordinate) : AddWallActionType {
    return {
        type: 'add-wall',
        position: position,
    };
}