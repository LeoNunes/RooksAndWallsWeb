import { AsyncAction, Dispatch } from '../Common/DataTypes';
import { createGame as createServerGame } from '../../Services/RnWServer/Actions';
import { RnWManagerState } from './Model';
import { rnwConfig } from '../../RnWConfig';

export type RnWManagerBaseAction = StartGameCreation | GameCreated | GameCreationFailed;

export type RnwManagerAction = AsyncAction<RnWManagerBaseAction, RnWManagerState>;
export type RnWManagerDispatch = Dispatch<RnwManagerAction>;

export function createGame(): RnwManagerAction {
    return async function (dispatch) {
        const tempId = crypto.randomUUID();
        try {
            dispatch(startGameCreation(tempId));
            const response = await createServerGame({
                boardRows: rnwConfig.boardSize.rows,
                boardColumns: rnwConfig.boardSize.columns,
                numberOfPlayers: 2,
                piecesPerPlayer: 3,
            });
            dispatch(gameCreated(tempId, response.gameId));
        } catch {
            dispatch(gameCreationFailed(tempId));
        }
    };
}

export type StartGameCreation = {
    type: 'start-game-creation';
    tempId: string;
};
function startGameCreation(tempId: string): StartGameCreation {
    return {
        type: 'start-game-creation',
        tempId,
    };
}

export type GameCreated = {
    type: 'game-created';
    tempId: string;
    gameId: number;
};
function gameCreated(tempId: string, gameId: number): GameCreated {
    return {
        type: 'game-created',
        tempId,
        gameId,
    };
}

export type GameCreationFailed = {
    type: 'game-creation-failed';
    tempId: string;
};
function gameCreationFailed(tempId: string): GameCreationFailed {
    return {
        type: 'game-creation-failed',
        tempId,
    };
}
