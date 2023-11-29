import {
    SquareCoordinate,
    EdgeCoordinate,
    areSquareCoordinatesEqual,
    areEdgeCoordinatesEqual,
    edgeToTheRightOf,
    edgeBelow,
} from 'Domain/Common/Coordinates';
import { rnwConfig } from 'RnWConfig';

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
    wallPosition?: EdgeCoordinate;
};

export type RnWState = {
    stage: Stage;
    playerId: number;
    currentPlayer: number | undefined;
    players: Player[];
    pieces: Piece[];
    walls: Wall[];
    deadPieces: Piece[];
    nextMove: NextMove;
};

export const rnwStateInitialValue: RnWState = {
    stage: 'waiting_for_players',
    playerId: 0,
    currentPlayer: undefined,
    players: [],
    pieces: [],
    walls: [],
    deadPieces: [],
    nextMove: {},
};

export type RnWModel = ReturnType<typeof createModel>;
export const createModel = (state: RnWState) => ({
    ...state,
    playerCurrentAction: () => playerCurrentAction(state),
    getPlayerId: () => state.playerId,
    getPieceById: (id: number) => getPieceById(state, id),
    getPieceFromPosition: (position: SquareCoordinate) => getPieceFromPosition(state, position),
    getWallFromPosition: (position: EdgeCoordinate) => getWallFromPosition(state, position),
    getPiecesFromPlayer: (playerId: number) => getPiecesFromPlayer(state, playerId),
    getPiecesThatCanMove: () => getPiecesThatCanMove(state),
    possibleDestinations: (piece: Piece) => possibleDestinations(state, piece),
    availableSquaresForPlacingPiece: () => availableSquaresForPlacingPiece(state),
    availableEdgesForPlacingWalls: () => availableEdgesForPlacingWalls(state),
    canPlacePiece: (position: SquareCoordinate) => canPlacePiece(state, position),
    canMoveTo: (piece: Piece, destination: SquareCoordinate) =>
        canMoveTo(state, piece, destination),
});

function isPlayersTurn(state: RnWState) {
    return state.currentPlayer === state.playerId;
}

export function playerCurrentAction(
    state: RnWState,
): 'add_piece' | 'move_piece' | 'add_wall' | undefined {
    if (!isPlayersTurn(state)) return undefined;

    if (state.stage === 'piece_placement') return 'add_piece';

    if (state.stage === 'moves' && state.nextMove.piece === undefined) return 'move_piece';

    if (state.stage === 'moves' && state.nextMove.wallPosition === undefined) return 'add_wall';

    return undefined;
}

export function getPieceById(state: RnWState, id: number) {
    return state.pieces.find(p => p.id === id);
}

export function getPieceFromPosition(state: RnWState, position: SquareCoordinate) {
    return state.pieces.find(p => areSquareCoordinatesEqual(p.position, position));
}

export function getWallFromPosition(state: RnWState, position: EdgeCoordinate) {
    return state.walls.find(w => areEdgeCoordinatesEqual(w.position, position));
}

export function getPiecesFromPlayer(state: RnWState, playerId: number) {
    return state.pieces.filter(p => p.owner === playerId);
}

export function getPiecesThatCanMove(state: RnWState) {
    if (playerCurrentAction(state) !== 'move_piece') return [];

    return state.pieces
        .filter(p => p.owner === state.playerId)
        .filter(piece => possibleDestinations(state, piece).length > 0);
}

export function possibleDestinations(state: RnWState, piece: Piece): SquareCoordinate[] {
    const destinations: SquareCoordinate[] = [];
    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    for (let [deltaRow, deltaColumn] of directions) {
        let currentSquare: SquareCoordinate = piece.position;
        while (true) {
            let nextSquare: SquareCoordinate = {
                row: currentSquare.row + deltaRow,
                column: currentSquare.column + deltaColumn,
            };

            if (!isSquareInsideBoard(nextSquare)) {
                break;
            }

            if (getWallFromPosition(state, { square1: currentSquare, square2: nextSquare })) {
                break;
            }

            if (getPieceFromPosition(state, nextSquare)) {
                break;
            }

            destinations.push(nextSquare);

            currentSquare = nextSquare;
        }
    }
    return destinations;
}

export function availableSquaresForPlacingPiece(state: RnWState) {
    if (playerCurrentAction(state) !== 'add_piece') return [];

    const result: SquareCoordinate[] = [];
    for (let r = 0; r < rnwConfig.boardSize.rows; r++) {
        for (let c = 0; c < rnwConfig.boardSize.columns; c++) {
            if (getPieceFromPosition(state, { row: r, column: c }) === undefined) {
                result.push({ row: r, column: c });
            }
        }
    }
    return result;
}

export function availableEdgesForPlacingWalls(state: RnWState) {
    if (playerCurrentAction(state) !== 'add_wall') return [];

    const result: EdgeCoordinate[] = [];
    for (let row = 0; row < rnwConfig.boardSize.rows; row++) {
        for (let column = 0; column < rnwConfig.boardSize.columns; column++) {
            if (column !== rnwConfig.boardSize.columns - 1) {
                const coord = edgeToTheRightOf({ row, column });
                if (getWallFromPosition(state, coord) === undefined) {
                    result.push(coord);
                }
            }
            if (row !== rnwConfig.boardSize.rows - 1) {
                const coord = edgeBelow({ row, column });
                if (getWallFromPosition(state, coord) === undefined) {
                    result.push(coord);
                }
            }
        }
    }
    return result;
}

export function canPlacePiece(state: RnWState, position: SquareCoordinate) {
    return getPieceFromPosition(state, position) === undefined;
}

export function canMoveTo(state: RnWState, piece: Piece, destination: SquareCoordinate) {
    return (
        possibleDestinations(state, piece).find(d => areSquareCoordinatesEqual(d, destination)) !==
        undefined
    );
}

function isSquareInsideBoard(coordinate: SquareCoordinate) {
    if (
        coordinate.row < 0 ||
        coordinate.row > rnwConfig.boardSize.rows - 1 ||
        coordinate.column < 0 ||
        coordinate.column > rnwConfig.boardSize.columns - 1
    ) {
        return false;
    }
    return true;
}
