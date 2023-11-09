import { RnWState } from './Model';
import {
    RnWAction,
    AddPieceActionType,
    AddWallActionType,
    MovePieceActionType,
    UpdateFromServerActionType,
    SetNextMovePiece,
    SetNextMoveWall,
} from './Actions';

export function rnwReducer(state: RnWState, action: RnWAction): RnWState {
    switch (action.type) {
        case 'add-piece': {
            const act = action as AddPieceActionType;
            return {
                ...state,
                pieces: [
                    ...state.pieces,
                    {
                        id:
                            state.pieces
                                .map(piece => piece.id)
                                .reduce((prev, curr) => Math.max(prev, curr), 0) + 1,
                        owner: act.owner,
                        position: act.position,
                    },
                ],
            };
        }
        case 'add-wall': {
            const act = action as AddWallActionType;
            return {
                ...state,
                walls: [...state.walls, { position: act.position }],
            };
        }
        case 'move-piece': {
            const act = action as MovePieceActionType;
            return {
                ...state,
                pieces: [
                    ...state.pieces.filter(p => p !== action.piece),
                    {
                        ...act.piece,
                        position: act.newPosition,
                    },
                ],
            };
        }
        case 'update-from-server': {
            const { serverState } = action as UpdateFromServerActionType;
            return {
                ...state,
                stage: serverState.stage,
                playerId: serverState.playerId,
                currentPlayer: serverState.currentTurn,
                players: serverState.players.map(p => ({
                    id: p.id,
                })),
                pieces: serverState.pieces.map(p => ({
                    id: p.id,
                    owner: p.owner,
                    position: p.position,
                })),
                walls: serverState.walls.map(w => ({
                    position: w.position,
                })),
                deadPieces: serverState.deadPieces.map(p => ({
                    id: p.id,
                    owner: p.owner,
                    position: p.position,
                })),
            };
        }
        case 'set-next-move-piece': {
            const act = action as SetNextMovePiece;
            return {
                ...state,
                nextMove: {
                    ...state.nextMove,
                    piece: act.piece,
                    piecePosition: act.position,
                },
            };
        }
        case 'set-next-move-wall': {
            const act = action as SetNextMoveWall;
            return {
                ...state,
                nextMove: {
                    ...state.nextMove,
                    wall: act.position,
                },
            };
        }
        // eslint-disable-next-line
        case 'reset-next-move': {
            return {
                ...state,
                nextMove: {
                    piece: undefined,
                    piecePosition: undefined,
                    wall: undefined,
                },
            };
        }
    }
}
