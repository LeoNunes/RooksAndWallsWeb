import { RnWData } from './Model';
import { RnWAction, AddPieceActionType, AddWallActionType, MovePieceActionType, UpdateFromServerActionType, SetNextMovePiece, SetNextMoveWall } from './Actions';

export function rnwDataReducer(data: RnWData, action: RnWAction) : RnWData {
    switch (action.type) {
        case 'add-piece': {
            const act = action as AddPieceActionType;
            return {
                ...data,
                pieces: [...data.pieces, {
                    id: data.pieces.map(piece => piece.id).reduce((prev, curr) => Math.max(prev, curr), 0) + 1,
                    owner: act.owner,
                    position: act.position,
                }]
            }
        };
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
                stage: serverData.stage,
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
        // eslint-disable-next-line
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
