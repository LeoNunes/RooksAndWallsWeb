import { GameData } from './Model';
import { GameDataAction, AddWallActionType, MovePieceActionType, UpdateFromServerActionType } from './Actions';

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
    }
};
