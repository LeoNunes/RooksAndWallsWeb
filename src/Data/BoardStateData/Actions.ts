import { Piece } from "../GameData/Model";
import { SquareCoordinate } from "../Common/Coordinates";

export type BoardStateAction = HighlighActionType | SelectPieceActionType;

export type SelectPieceActionType = {
    type: 'select-piece',
    piece?: Piece,
};
export function selectPieceActionCreator(piece: Piece): SelectPieceActionType {
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
