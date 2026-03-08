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
        /** biome-ignore-start lint/style/noNonNullAssertion: It is expected that all players are in the players array */
        case "update-from-server": {
            const { serverState } = action;
            const players = serverState.players.map((p, index) => ({
                id: p.id,
                number: index,
                displayName: p.displayName,
            }));
            const playersById = new Map(players.map((p) => [p.id, p]));
            const currentPlayerIndex = serverState.players.findIndex((p) => p.id === serverState.currentTurn);
            return {
                ...state,
                stage: serverState.stage,
                localPlayer: playersById.get(serverState.playerId)!,
                currentPlayer: currentPlayerIndex >= 0 ? players[currentPlayerIndex] : undefined,
                numberOfPlayers: serverState.config.numberOfPlayers,
                players,
                remainingPlayers: serverState.remainingPlayers.map((rp) => playersById.get(rp.id)!),
                pieces: serverState.pieces.map((p) => {
                    return {
                        id: p.id,
                        owner: playersById.get(p.owner)!,
                        position: p.position,
                    };
                }),
                walls: serverState.walls.map((w) => ({
                    position: w.position,
                })),
                deadPieces: serverState.deadPieces.map((p) => {
                    return {
                        id: p.id,
                        owner: playersById.get(p.owner)!,
                        position: p.position,
                    };
                }),
            };
        }
        /** biome-ignore-end lint/style/noNonNullAssertion: It is expected that all players are in the players array */
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
