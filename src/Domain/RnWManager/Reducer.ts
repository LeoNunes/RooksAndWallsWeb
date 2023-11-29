import { RnWManagerBaseAction } from './Actions';
import { RnWManagerState } from './Model';

export function rnwManagerReducer(
    state: RnWManagerState,
    action: RnWManagerBaseAction,
): RnWManagerState {
    switch (action.type) {
        case 'start-game-creation': {
            return {
                ...state,
                games: [...state.games, { tempId: action.tempId, gameId: -1, isCreating: true }],
            };
        }
        case 'game-created': {
            const game = state.games.find(g => g.tempId === action.tempId);
            if (!game) return state;

            return {
                ...state,
                games: [
                    ...state.games.filter(g => g.tempId !== action.tempId),
                    { ...game, gameId: action.gameId, isCreating: false },
                ],
            };
        }
        case 'game-creation-failed': {
            // TODO: Handle failure
            return {
                ...state,
            };
        }
        case 'join-game': {
            return {
                ...state,
                games: [...state.games, { gameId: action.gameId, isCreating: false }],
            };
        }
    }
}
