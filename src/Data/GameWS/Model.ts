import { EdgeCoordinate, SquareCoordinate } from "../Common/Coordinates";

export type WSGameState = {
    gameId: number;
    config: GameConfig;
    stage: GameStage;
    currentTurn?: number;
    playerId: number;
    players: Player[];
    pieces: Piece[];
    walls: Wall[];
    deadPieces: Piece[];
};

type GameConfig = {
    numberOfPlayers: number;
    piecesPerPlayer: number;
    boardRows: number;
    boardColumns: number;
};

type GameStage = 'waiting_for_players' | 'piece_placement' | 'moves' | 'completed';

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

export function isGameState(obj: any): obj is WSGameState {
    const gameState = obj as WSGameState;
    return gameState.gameId !== undefined &&
           gameState.config !== undefined &&
           gameState.stage !== undefined &&
           gameState.playerId !== undefined &&
           gameState.players !== undefined &&
           gameState.pieces !== undefined &&
           gameState.walls !== undefined &&
           gameState.deadPieces !== undefined;
}
