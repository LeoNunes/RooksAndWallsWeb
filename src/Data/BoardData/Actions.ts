import { BoardPiece, BoardWall } from "./Model";
import { SquareCoordinate } from "../Common/Coordinates";

export type BoardAction = HighlighActionType | SelectPieceActionType | SetPiecesActionType | SetWallsActionType;

export type SelectPieceActionType = {
    type: 'select-piece',
    piece?: BoardPiece,
};
export function selectPieceActionCreator(piece: BoardPiece): SelectPieceActionType {
    return {
        type: 'select-piece',
        piece: piece,
    };
};
export function clearPieceSelectionActionCreator() : SelectPieceActionType {
    return {
        type: 'select-piece',
        piece: undefined,
    };
};

export type HighlighActionType = {
    type: 'highlight',
    squares: SquareCoordinate[],
};
export function highlighActionCreator(squares: SquareCoordinate[]) : HighlighActionType {
    return {
        type: "highlight",
        squares: squares,
    };
};
export function clearHighlightActionCreator() : HighlighActionType {
    return {
        type: "highlight",
        squares: [],
    };
};

export type SetPiecesActionType = {
    type: 'set-pieces',
    pieces: BoardPiece[],
};
export function setPiecesActionCreator(pieces: BoardPiece[]) : SetPiecesActionType {
    return {
        type: 'set-pieces',
        pieces: pieces,
    };
};

export type SetWallsActionType = {
    type: 'set-walls',
    walls: BoardWall[],
};
export function setWallsActionCreator(walls: BoardWall[]) : SetWallsActionType {
    return {
        type: 'set-walls',
        walls: walls,
    };
};
