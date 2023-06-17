import { GamePiece } from "./Model";
import { SquareCoordinate, EdgeCoordinate } from "../Common/Coordinates";

export type GameDataAction = MovePieceActionType | AddWallActionType;

export type MovePieceActionType = {
    type: 'move-piece',
    piece: GamePiece,
    newPosition: SquareCoordinate,
};
export function movePieceActionCreator(piece: GamePiece, newPosition: SquareCoordinate) : MovePieceActionType {
    return {
        type: 'move-piece',
        piece: piece,
        newPosition: newPosition,
    };
};

export type AddWallActionType = {
    type: 'add-wall',
    position: EdgeCoordinate,
};
export function addWallActionCreator(position: EdgeCoordinate) : AddWallActionType {
    return {
        type: 'add-wall',
        position: position,
    };
};