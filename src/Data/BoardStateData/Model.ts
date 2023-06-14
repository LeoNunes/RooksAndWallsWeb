import { Piece, SquareCoordinate, areSquareCoordinatesEqual } from "../GameData/Model";

export type BoardStateData = {
    selectedPiece?: Piece,
    highlightedSquares?: SquareCoordinate[],
};

export const boardStateDataInitialValue: BoardStateData = {
};

export type BoardEventHandlers = {
    squareClicked?: (coordinate: SquareCoordinate) => void;
};

export function isSquareHighlighted(data: BoardStateData, coordinate: SquareCoordinate) {
    return data.highlightedSquares?.find(c => areSquareCoordinatesEqual(c, coordinate)) !== undefined;
}