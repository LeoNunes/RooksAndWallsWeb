import {
    SquareCoordinate,
    EdgeCoordinate,
    areSquareCoordinatesEqual,
    areEdgeCoordinatesEqual
} from '../Common/Coordinates';
import { gameConfig } from '../../GameConfig';

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

type NextMove = {
    piece?: GamePiece;
    piecePosition?: SquareCoordinate;
    wall?: EdgeCoordinate;
};

export type GameData = {
    gameStage: GameStage;
    playerId: number;
    currentPlayer: number | undefined;
    players: Player[];
    pieces: GamePiece[];
    walls: GameWall[];
    deadPieces: GamePiece[];
    nextMove: NextMove;
};

export const gameDataInitialValue: GameData = {
    gameStage: 'waiting_for_players',
    playerId: 0,
    currentPlayer: undefined,
    players: [],
    pieces: [],
    walls: [],
    deadPieces: [],
    nextMove: {},
};

export const modelBuilder = (data: GameData) => ({
    getPlayerId: () => data.playerId,
    getPieceById: (id: number) => getPieceById(data, id),
    getPieceFromPosition: (position: SquareCoordinate) => getPieceFromPosition(data, position),
    getWallFromPosition: (position: EdgeCoordinate) => getWallFromPosition(data, position),
    getPiecesFromPlayer: (playerId: number) => getPiecesFromPlayer(data, playerId),
    possibleDestinations: (piece: GamePiece) => possibleDestinations(data, piece),
    isPlayersTurn: () => isPlayersTurn(data),
    availableSquaresForPlacingPiece: () => availableSquaresForPlacingPiece(data),
    canPlacePiece: (position: SquareCoordinate) => canPlacePiece(data, position),
    canMoveTo: (piece: GamePiece, destination: SquareCoordinate) => canMoveTo(data, piece, destination),
});

export function getPieceById(data: GameData, id: number) {
    const piece = data.pieces.find(p => p.id === id);
    if (piece === undefined) {
        throw new Error(`Piece with id ${id} was not found`);
    }
    return piece;
}

export function getPieceFromPosition(data: GameData, position: SquareCoordinate) {
    return data.pieces.find(p => areSquareCoordinatesEqual(p.position, position));
}

export function getWallFromPosition(data: GameData, position: EdgeCoordinate) {
    return data.walls.find(w => areEdgeCoordinatesEqual(w.position, position));
}

export function getPiecesFromPlayer(data: GameData, playerId: number) {
    return data.pieces.filter(p => p.owner === playerId);
}

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

export function isPlayersTurn(data: GameData) {
    return data.currentPlayer === data.playerId;
}

export function availableSquaresForPlacingPiece(data: GameData) {
    const result: SquareCoordinate[] = [];
    for (let r = 0; r < gameConfig.boardSize.rows; r++) {
        for (let c = 0; c < gameConfig.boardSize.columns; c++) {
            if (getPieceFromPosition(data, { row: r, column: c }) === undefined) {
                result.push({ row: r, column: c });
            }
        }
    }
    return result;
}

export function canPlacePiece(data: GameData, position: SquareCoordinate) {
    return getPieceFromPosition(data, position) === undefined;
}

export function canMoveTo(data: GameData, piece: GamePiece, destination: SquareCoordinate) {
    return possibleDestinations(data, piece).find(d => areSquareCoordinatesEqual(d, destination)) !== undefined;
}

function isSquareInsideBoard(coordinate: SquareCoordinate) {
    if (coordinate.row < 0 || coordinate.row > gameConfig.boardSize.rows - 1 ||
        coordinate.column < 0 || coordinate.column > gameConfig.boardSize.columns - 1) {
        return false;
    }
    return true;
}
