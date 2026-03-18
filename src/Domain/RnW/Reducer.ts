import type { RnWBaseAction } from "./Actions";
import type { RnWState } from "./Model";

export function rnwReducer(state: RnWState, action: RnWBaseAction): RnWState {
    switch (action.type) {
        case "add-piece": {
            return {
                ...state,
                pieces: [
                    ...state.pieces,
                    {
                        id: state.pieces.map((piece) => piece.id).reduce((prev, curr) => Math.max(prev, curr), 0) + 1,
                        owner: action.owner,
                        position: action.position,
                    },
                ],
            };
        }
        case "add-wall": {
            return {
                ...state,
                walls: [...state.walls, { position: action.position }],
            };
        }
        case "move-piece": {
            return {
                ...state,
                pieces: [
                    ...state.pieces.filter((p) => p !== action.piece),
                    {
                        ...action.piece,
                        position: action.newPosition,
                    },
                ],
            };
        }
        case "update-from-server": {
            const { serverState } = action;
            const players = serverState.players.map((p, index) => ({
                id: p.id,
                number: index,
                displayName: p.displayName,
            }));
            const playersById = new Map(players.map((p) => [p.id, p]));
            return {
                ...state,
                gameId: serverState.gameId,
                stage: serverState.stage,
                // biome-ignore lint/style/noNonNullAssertion: The local player is always in the players list
                localPlayer: playersById.get(serverState.playerId)!,
                currentPlayer: serverState.currentTurn,
                numberOfPlayers: serverState.config.numberOfPlayers,
                players,
                remainingPlayers: [...serverState.remainingPlayers],
                pieces: serverState.pieces.map((p) => ({
                    id: p.id,
                    owner: p.owner,
                    position: p.position,
                })),
                walls: serverState.walls.map((w) => ({
                    position: w.position,
                })),
                deadPieces: serverState.deadPieces.map((p) => ({
                    id: p.id,
                    owner: p.owner,
                    position: p.position,
                })),
            };
        }
        case "set-next-move-piece-movement": {
            return {
                ...state,
                nextMove: {
                    ...state.nextMove,
                    pieceMovement: { piece: action.piece, position: action.position },
                },
            };
        }
        case "set-next-move-wall-placement": {
            return {
                ...state,
                nextMove: {
                    ...state.nextMove,
                    wallPlacement: { position: action.position },
                },
            };
        }
        case "reset-next-move": {
            return {
                ...state,
                nextMove: {},
            };
        }
    }
}
