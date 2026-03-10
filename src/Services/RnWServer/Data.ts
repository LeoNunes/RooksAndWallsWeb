import {
    type EdgeCoordinate,
    isEdgeCoordinate,
    isSquareCoordinate,
    type SquareCoordinate,
} from "Domain/Common/Coordinates";
import { type Immutable, isArrayOf } from "Util";

export type CreateGameRequest = {
    numberOfPlayers: number;
    piecesPerPlayer: number;
    boardRows: number;
    boardColumns: number;
};

export type CreateGameResponse = {
    gameId: string;
};

export type RnWGameState = Immutable<{
    gameId: string;
    config: GameConfig;
    stage: GameStage;
    currentTurn?: string;
    playerId: string;
    players: Player[];
    remainingPlayers: Player[];
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

const gameStages = ["waiting_for_players", "piece_placement", "moves", "completed"] as const;
type GameStage = (typeof gameStages)[number];

type Player = {
    id: string;
    displayName: string;
};

type Piece = {
    id: number;
    owner: string;
    position: SquareCoordinate;
};

type Wall = {
    position: EdgeCoordinate;
};

export function isRnWGameState(obj: unknown): obj is RnWGameState {
    const gameState = obj as RnWGameState;
    return (
        typeof gameState === "object" &&
        typeof gameState.gameId === "string" &&
        isGameConfig(gameState.config) &&
        isGameStage(gameState.stage) &&
        typeof gameState.playerId === "string" &&
        isArrayOf<Player>(gameState.players, isPlayer) &&
        isArrayOf<Player>(gameState.remainingPlayers, isPlayer) &&
        isArrayOf<Piece>(gameState.pieces, isPiece) &&
        isArrayOf<Wall>(gameState.walls, isWall) &&
        isArrayOf<Piece>(gameState.deadPieces, isPiece)
    );
}

function isGameConfig(obj: unknown): obj is GameConfig {
    const gameConfig = obj as GameConfig;
    return (
        typeof gameConfig === "object" &&
        typeof gameConfig.boardColumns === "number" &&
        typeof gameConfig.boardRows === "number" &&
        typeof gameConfig.numberOfPlayers === "number" &&
        typeof gameConfig.piecesPerPlayer === "number"
    );
}

function isGameStage(obj: unknown): obj is GameStage {
    const expectedStages: readonly string[] = gameStages;
    return typeof obj === "string" && expectedStages.includes(obj);
}

function isPlayer(obj: unknown): obj is Player {
    const player = obj as Player;
    return typeof player === "object" && typeof player.id === "string" && typeof player.displayName === "string";
}

function isPiece(obj: unknown): obj is Piece {
    const piece = obj as Piece;
    return (
        typeof piece === "object" &&
        typeof piece.id === "number" &&
        typeof piece.owner === "string" &&
        isSquareCoordinate(piece.position)
    );
}

function isWall(obj: unknown): obj is Wall {
    const wall = obj as Wall;
    return typeof wall === "object" && isEdgeCoordinate(wall.position);
}
