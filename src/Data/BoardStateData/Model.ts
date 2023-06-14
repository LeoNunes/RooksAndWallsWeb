import { Piece } from "../GameData/Model";
import { SquareCoordinate, areSquareCoordinatesEqual } from "../Common/Coordinates";

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
};
