import { GameData } from './Model';
import { GameDataAction, AddWallActionType, MovePieceActionType, UpdateFromServerActionType, SetNextMovePiece, SetNextMoveWall } from './Actions';

export function gameDataReducer(data: GameData, action: GameDataAction) : GameData {
    switch (action.type) {
        case 'add-wall': {
            const act = action as AddWallActionType;
            return {
                ...data,
                walls: [
                    ...data.walls,
                    { position: act.position }
                ],
            };
        };
        case 'move-piece': {
            const act = action as MovePieceActionType;
            return {
                ...data,
                pieces: [
                    ...data.pieces.filter(p => p !== action.piece),
                    {
                        ...act.piece,
                        position: act.newPosition,
                    }
                ],
            };
        };
        case 'update-from-server': {
            const { serverData } = action as UpdateFromServerActionType;
            return {
                ...data,
                gameStage: serverData.stage,
                playerId: serverData.playerId,
                currentPlayer: serverData.currentTurn,
                players: serverData.players.map(p => ({
                    id: p.id,
                })),
                pieces: serverData.pieces.map(p => ({
                    id: p.id,
                    owner: p.owner,
                    position: p.position,
                })),
                walls: serverData.walls.map(w => ({
                    position: w.position,
                })),
                deadPieces: serverData.deadPieces.map(p => ({
                    id: p.id,
                    owner: p.owner,
                    position: p.position,
                })),
            };
        };
        case 'set-next-move-piece': {
            const act = action as SetNextMovePiece;
            return {
                ...data,
                nextMove: {
                    ...data.nextMove,
                    piece: act.piece,
                    piecePosition: act.position,
                }
            };
        };
        case 'set-next-move-wall': {
            const act = action as SetNextMoveWall;
            return {
                ...data,
                nextMove: {
                    ...data.nextMove,
                    wall: act.position,
                }
            };
        };
        case 'reset-next-move': {
            return {
                ...data,
                nextMove: {
                    piece: undefined,
                    piecePosition: undefined,
                    wall: undefined,
                }
            };
        };
    }
};
