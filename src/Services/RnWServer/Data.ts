import { Immutable, isArrayOf } from '../../Util';
import {
    EdgeCoordinate,
    SquareCoordinate,
    isEdgeCoordinate,
    isSquareCoordinate,
} from '../../Data/Common/Coordinates';

export type ServerState = Immutable<{
    gameId: number;
    config: GameConfig;
    stage: GameStage;
    currentTurn?: number;
    playerId: number;
    players: Player[];
    pieces: Piece[];
    walls: Wall[];
    deadPieces: Piece[];
}>;

type GameConfig = {
    numberOfPlayers: number;
    piecesPerPlayer: number;
    boardRows: number;
    boardColumns: number;
};

const gameStages = ['waiting_for_players', 'piece_placement', 'moves', 'completed'] as const;
type GameStage = (typeof gameStages)[number];

type Player = {
    id: number;
};

type Piece = {
    id: number;
    owner: number;
    position: SquareCoordinate;
};

type Wall = {
    position: EdgeCoordinate;
};

export type ServerAction = Immutable<{
    addPiece?: AddPieceAction;
    move?: MoveAction;
}>;

type AddPieceAction = {
    position: SquareCoordinate;
};
export function addPieceAction(position: SquareCoordinate): ServerAction {
    return {
        addPiece: {
            position: position,
        },
    };
}

type MoveAction = {
    pieceId: number;
    position: SquareCoordinate;
    wallPosition: EdgeCoordinate;
};
export function moveAction(
    pieceId: number,
    destination: SquareCoordinate,
    wallPosition: EdgeCoordinate,
): ServerAction {
    return {
        move: {
            pieceId: pieceId,
            position: destination,
            wallPosition: wallPosition,
        },
    };
}

export function isServerState(obj: any): obj is ServerState {
    const gameState = obj as ServerState;
    return (
        typeof gameState === 'object' &&
        typeof gameState.gameId === 'number' &&
        isGameConfig(gameState.config) &&
        isGameStage(gameState.stage) &&
        typeof gameState.playerId === 'number' &&
        isArrayOf<Player>(gameState.players, isPlayer) &&
        isArrayOf<Piece>(gameState.pieces, isPiece) &&
        isArrayOf<Wall>(gameState.walls, isWall) &&
        isArrayOf<Piece>(gameState.deadPieces, isPiece)
    );
}

function isGameConfig(obj: any): obj is GameConfig {
    const gameConfig = obj as GameConfig;
    return (
        typeof gameConfig === 'object' &&
        typeof gameConfig.boardColumns === 'number' &&
        typeof gameConfig.boardRows === 'number' &&
        typeof gameConfig.numberOfPlayers === 'number' &&
        typeof gameConfig.piecesPerPlayer === 'number'
    );
}

function isGameStage(obj: any): obj is GameStage {
    const expectedStages: readonly string[] = gameStages;
    return typeof obj === 'string' && expectedStages.includes(obj);
}

function isPlayer(obj: any): obj is Player {
    const player = obj as Player;
    return typeof player === 'object' && typeof player.id === 'number';
}

function isPiece(obj: any): obj is Piece {
    const piece = obj as Piece;
    return (
        typeof piece === 'object' &&
        typeof piece.id === 'number' &&
        typeof piece.owner === 'number' &&
        isSquareCoordinate(piece.position)
    );
}

function isWall(obj: any): obj is Wall {
    const wall = obj as Wall;
    return typeof wall === 'object' && isEdgeCoordinate(wall.position);
}