import { RnWState } from './Model';
import { RnWBaseAction } from './Actions';

export function rnwReducer(state: RnWState, action: RnWBaseAction): RnWState {
    switch (action.type) {
        case 'add-piece': {
            return {
                ...state,
                pieces: [
                    ...state.pieces,
                    {
                        id:
                            state.pieces
                                .map(piece => piece.id)
                                .reduce((prev, curr) => Math.max(prev, curr), 0) + 1,
                        owner: action.owner,
                        position: action.position,
                    },
                ],
            };
        }
        case 'add-wall': {
            return {
                ...state,
                walls: [...state.walls, { position: action.position }],
            };
        }
        case 'move-piece': {
            return {
                ...state,
                pieces: [
                    ...state.pieces.filter(p => p !== action.piece),
                    {
                        ...action.piece,
                        position: action.newPosition,
                    },
                ],
            };
        }
        case 'update-from-server': {
            const { serverState } = action;
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
            return {
                ...state,
                nextMove: {
                    ...state.nextMove,
                    piece: action.piece,
                    piecePosition: action.position,
                },
            };
        }
        case 'set-next-move-wall': {
            return {
                ...state,
                nextMove: {
                    ...state.nextMove,
                    wallPosition: action.position,
                },
            };
        }
        case 'reset-next-move': {
            return {
                ...state,
                nextMove: {
                    piece: undefined,
                    piecePosition: undefined,
                    wallPosition: undefined,
                },
            };
        }
    }
}
