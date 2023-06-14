import {
    SquareCoordinate,
    EdgeCoordinate,
    areSquareCoordinatesEqual,
    areEdgeCoordinatesEqual
} from "../Common/Coordinates";
import GameConfig from "../../GameConfig";

export type Piece = {
    owner: number,
    coordinate: SquareCoordinate,
}

export type Wall = {
    coordinate: EdgeCoordinate,
};

export type GameData = {
    pieces: Piece[],
    walls: Wall[],
};

export const gameDataInitialValue: GameData = {
    pieces: [
        {
            owner: 0,
            coordinate: { row: 0, column: 0 }
        },
        {
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

export function getPieceFromPosition(data: GameData, position: SquareCoordinate) {
    return data.pieces.find(p => areSquareCoordinatesEqual(p.coordinate, position));
}

export function getWallFromPosition(data: GameData, position: EdgeCoordinate) {
    return data.walls.find(w => areEdgeCoordinatesEqual(w.coordinate, position));
}

export function isSquareInsideBoard(coordinate: SquareCoordinate) {
    if (coordinate.row < 0 || coordinate.row > GameConfig.boardSize.rows - 1 ||
        coordinate.column < 0 || coordinate.column > GameConfig.boardSize.columns - 1) {
        return false;
    }
    return true;
}

export function possibleDestinations(data: GameData, piece: Piece) : SquareCoordinate[] {
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

            if (getWallFromPosition(data, { square1: currentSquare, square2: nextSquare })) {
                break;
            }

            if (getPieceFromPosition(data, nextSquare)) {
                break;
            }

            destinations.push(nextSquare);

            currentSquare = nextSquare;
        }
    }
    return destinations;
}

export function canMoveTo(data: GameData, piece: Piece, destination: SquareCoordinate) {
    return possibleDestinations(data, piece).find(d => areSquareCoordinatesEqual(d, destination)) !== undefined;
}
