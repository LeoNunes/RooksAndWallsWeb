import {
    SquareCoordinate,
    EdgeCoordinate,
    areSquareCoordinatesEqual,
    areEdgeCoordinatesEqual
} from "../Common/Coordinates";
import GameConfig from "../../GameConfig";

export type GamePiece = {
    id: number,
    owner: number,
    coordinate: SquareCoordinate,
};

export type GameWall = {
    coordinate: EdgeCoordinate,
};

export type GameData = {
    pieces: GamePiece[],
    walls: GameWall[],
};

export const gameDataInitialValue: GameData = {
    pieces: [
        {
            id: 0,
            owner: 0,
            coordinate: { row: 0, column: 0 }
        },
        {
            id: 1,
            owner: 1,
            coordinate: { row: 7, column: 7 }
        }
    ],
    walls: [
        {
            coordinate: {
                square1: { row: 0, column: 0 },
                square2: { row: 0, column: 1 }
            }
        },
        {
            coordinate: {
                square1: { row: 5, column: 5 },
                square2: { row: 6, column: 5 }
            }
        }
    ],
};

export function getGamePieceById(data: GameData, id: number) {
    const piece = data.pieces.find(p => p.id === id);
    if (piece === undefined) {
        throw new Error(`Piece with id ${id} was not found`);
    }
    return piece;
};

export function getGamePieceFromPosition(data: GameData, position: SquareCoordinate) {
    return data.pieces.find(p => areSquareCoordinatesEqual(p.coordinate, position));
};

export function getGameWallFromPosition(data: GameData, position: EdgeCoordinate) {
    return data.walls.find(w => areEdgeCoordinatesEqual(w.coordinate, position));
};

export function isSquareInsideBoard(coordinate: SquareCoordinate) {
    if (coordinate.row < 0 || coordinate.row > GameConfig.boardSize.rows - 1 ||
        coordinate.column < 0 || coordinate.column > GameConfig.boardSize.columns - 1) {
        return false;
    }
    return true;
};

export function possibleDestinations(data: GameData, piece: GamePiece) : SquareCoordinate[] {
    const destinations: SquareCoordinate[] = [];
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    for (let [deltaRow, deltaColumn] of directions) {
        let currentSquare: SquareCoordinate = piece.coordinate;
        while (true) {
            let nextSquare: SquareCoordinate = {
                row: currentSquare.row + deltaRow,
                column: currentSquare.column + deltaColumn
            };

            if (!isSquareInsideBoard(nextSquare)) {
                break;
            }

            if (getGameWallFromPosition(data, { square1: currentSquare, square2: nextSquare })) {
                break;
            }

            if (getGamePieceFromPosition(data, nextSquare)) {
                break;
            }

            destinations.push(nextSquare);

            currentSquare = nextSquare;
        }
    }
    return destinations;
};

export function canMoveTo(data: GameData, piece: GamePiece, destination: SquareCoordinate) {
    return possibleDestinations(data, piece).find(d => areSquareCoordinatesEqual(d, destination)) !== undefined;
};
