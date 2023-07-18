import {
    SquareCoordinate,
    EdgeCoordinate,
    areSquareCoordinatesEqual,
    areEdgeCoordinatesEqual
} from "../Common/Coordinates";
import { gameConfig } from "../../GameConfig";

export type GameStage = 'waiting_for_players' | 'piece_placement' | 'moves' | 'completed';

export type Player = {
    id: number;
};

export type GamePiece = {
    id: number;
    owner: number;
    position: SquareCoordinate;
};

export type GameWall = {
    position: EdgeCoordinate;
};

export type GameData = {
    gameStage: GameStage;
    playerId: number;
    currentPlayer: number | undefined;
    players: Player[];
    pieces: GamePiece[];
    walls: GameWall[];
    deadPieces: GamePiece[];
};

export const gameDataInitialValue: GameData = {
    gameStage: 'waiting_for_players',
    playerId: 0,
    currentPlayer: undefined,
    players: [],
    pieces: [
        {
            id: 0,
            owner: 0,
            position: { row: 0, column: 0 }
        },
        {
            id: 1,
            owner: 1,
            position: { row: 7, column: 7 }
        }
    ],
    walls: [
        {
            position: {
                square1: { row: 0, column: 0 },
                square2: { row: 0, column: 1 }
            }
        },
        {
            position: {
                square1: { row: 5, column: 5 },
                square2: { row: 6, column: 5 }
            }
        }
    ],
    deadPieces: [],
};

export function getGamePieceById(data: GameData, id: number) {
    const piece = data.pieces.find(p => p.id === id);
    if (piece === undefined) {
        throw new Error(`Piece with id ${id} was not found`);
    }
    return piece;
};

export function getGamePieceFromPosition(data: GameData, position: SquareCoordinate) {
    return data.pieces.find(p => areSquareCoordinatesEqual(p.position, position));
};

export function getGameWallFromPosition(data: GameData, position: EdgeCoordinate) {
    return data.walls.find(w => areEdgeCoordinatesEqual(w.position, position));
};

export function isSquareInsideBoard(coordinate: SquareCoordinate) {
    if (coordinate.row < 0 || coordinate.row > gameConfig.boardSize.rows - 1 ||
        coordinate.column < 0 || coordinate.column > gameConfig.boardSize.columns - 1) {
        return false;
    }
    return true;
};

export function possibleDestinations(data: GameData, piece: GamePiece) : SquareCoordinate[] {
    const destinations: SquareCoordinate[] = [];
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    for (let [deltaRow, deltaColumn] of directions) {
        let currentSquare: SquareCoordinate = piece.position;
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
