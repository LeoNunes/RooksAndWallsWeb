import {
    SquareCoordinate,
    EdgeCoordinate,
    areSquareCoordinatesEqual,
    areEdgeCoordinatesEqual,
    edgeToTheRightOf,
    edgeBelow
} from '../Common/Coordinates';
import { rnwConfig } from '../../RnWConfig';

export type Stage = 'waiting_for_players' | 'piece_placement' | 'moves' | 'completed';

export type Player = {
    id: number;
};

export type Piece = {
    id: number;
    owner: number;
    position: SquareCoordinate;
};

export type Wall = {
    position: EdgeCoordinate;
};

type NextMove = {
    piece?: Piece;
    piecePosition?: SquareCoordinate;
    wall?: EdgeCoordinate;
};

export type RnWData = {
    stage: Stage;
    playerId: number;
    currentPlayer: number | undefined;
    players: Player[];
    pieces: Piece[];
    walls: Wall[];
    deadPieces: Piece[];
    nextMove: NextMove;
};

export const rnwDataInitialValue: RnWData = {
    stage: 'waiting_for_players',
    playerId: 0,
    currentPlayer: undefined,
    players: [],
    pieces: [],
    walls: [],
    deadPieces: [],
    nextMove: {},
};

export const modelBuilder = (data: RnWData) => ({
    getPlayerId: () => data.playerId,
    getPieceById: (id: number) => getPieceById(data, id),
    getPieceFromPosition: (position: SquareCoordinate) => getPieceFromPosition(data, position),
    getWallFromPosition: (position: EdgeCoordinate) => getWallFromPosition(data, position),
    getPiecesFromPlayer: (playerId: number) => getPiecesFromPlayer(data, playerId),
    possibleDestinations: (piece: Piece) => possibleDestinations(data, piece),
    isPlayersTurn: () => isPlayersTurn(data),
    availableSquaresForPlacingPiece: () => availableSquaresForPlacingPiece(data),
    availableEdgesForPlacingWalls: () => availableEdgesForPlacingWalls(data),
    canPlacePiece: (position: SquareCoordinate) => canPlacePiece(data, position),
    canMoveTo: (piece: Piece, destination: SquareCoordinate) => canMoveTo(data, piece, destination),
});

export function getPieceById(data: RnWData, id: number) {
    const piece = data.pieces.find(p => p.id === id);
    if (piece === undefined) {
        throw new Error(`Piece with id ${id} was not found`);
    }
    return piece;
}

export function getPieceFromPosition(data: RnWData, position: SquareCoordinate) {
    return data.pieces.find(p => areSquareCoordinatesEqual(p.position, position));
}

export function getWallFromPosition(data: RnWData, position: EdgeCoordinate) {
    return data.walls.find(w => areEdgeCoordinatesEqual(w.position, position));
}

export function getPiecesFromPlayer(data: RnWData, playerId: number) {
    return data.pieces.filter(p => p.owner === playerId);
}

export function possibleDestinations(data: RnWData, piece: Piece) : SquareCoordinate[] {
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

export function isPlayersTurn(data: RnWData) {
    return data.currentPlayer === data.playerId;
}

export function availableSquaresForPlacingPiece(data: RnWData) {
    const result: SquareCoordinate[] = [];
    for (let r = 0; r < rnwConfig.boardSize.rows; r++) {
        for (let c = 0; c < rnwConfig.boardSize.columns; c++) {
            if (getPieceFromPosition(data, { row: r, column: c }) === undefined) {
                result.push({ row: r, column: c });
            }
        }
    }
    return result;
}

export function availableEdgesForPlacingWalls(data: RnWData) {
    const result: EdgeCoordinate[] = [];
    for (let row = 0; row < rnwConfig.boardSize.rows; row++) {
        for (let column = 0; column < rnwConfig.boardSize.columns; column++) {
            if (column !== rnwConfig.boardSize.columns - 1) {
                const coord = edgeToTheRightOf({row, column});
                if (getWallFromPosition(data, coord) === undefined) {
                    result.push(coord);
                }
            }
            if (row !== rnwConfig.boardSize.rows - 1) {
                const coord = edgeBelow({row, column});
                if (getWallFromPosition(data, coord) === undefined) {
                    result.push(coord);
                }
            }
        }
    }
    return result;
}

export function canPlacePiece(data: RnWData, position: SquareCoordinate) {
    return getPieceFromPosition(data, position) === undefined;
}

export function canMoveTo(data: RnWData, piece: Piece, destination: SquareCoordinate) {
    return possibleDestinations(data, piece).find(d => areSquareCoordinatesEqual(d, destination)) !== undefined;
}

function isSquareInsideBoard(coordinate: SquareCoordinate) {
    if (coordinate.row < 0 || coordinate.row > rnwConfig.boardSize.rows - 1 ||
        coordinate.column < 0 || coordinate.column > rnwConfig.boardSize.columns - 1) {
        return false;
    }
    return true;
}
