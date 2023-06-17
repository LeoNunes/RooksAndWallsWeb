import { EdgeCoordinate, SquareCoordinate, areEdgeCoordinatesEqual, areSquareCoordinatesEqual } from "../Common/Coordinates";
import { PieceConfig } from '../../GameConfig';

export type BoardPiece = {
    id: number,
    position: SquareCoordinate,
    config: PieceConfig,
};

export type BoardWall = {
    id: number,
    position: EdgeCoordinate,
};

export type BoardStateData = {
    selectedPiece?: BoardPiece,
    highlightedSquares?: SquareCoordinate[],
    pieces: BoardPiece[],
    walls: BoardWall[],
    piecePlacement?: { piece: PieceConfig, availableSquares: SquareCoordinate[] },
    wallPlacement?: { availableEdges: EdgeCoordinate[] },
};

export const boardStateDataInitialValue: BoardStateData = {
    pieces: [],
    walls: [],
};

export type BoardEventHandlers = {
    squareClicked?: (coordinate: SquareCoordinate) => void;
    edgeClicked?: (coordinate: EdgeCoordinate) => void;
};

export function getBoardPieceById(data: BoardStateData, id: number) {
    const piece = data.pieces.find(p => p.id === id);
    if (piece === undefined) {
        throw new Error(`Piece with id ${id} was not found`);
    }
    return piece;
};

export function getBoardWallById(data: BoardStateData, id: number) {
    const wall = data.walls.find(p => p.id === id);
    if (wall === undefined) {
        throw new Error(`Wall with id ${id} was not found`);
    }
    return wall;
};

export function getBoardPieceFromPosition(data: BoardStateData, position: SquareCoordinate) {
    return data.pieces.find(p => areSquareCoordinatesEqual(p.position, position));
};

export function getBoardWallFromPosition(data: BoardStateData, position: EdgeCoordinate) {
    return data.walls.find(w => areEdgeCoordinatesEqual(w.position, position));
};

export function isSquareHighlighted(data: BoardStateData, coordinate: SquareCoordinate) {
    return data.highlightedSquares?.find(c => areSquareCoordinatesEqual(c, coordinate)) !== undefined;
};
