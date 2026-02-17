import type { AsyncAction, Dispatch } from "Domain/Common/DataTypes";
import { rnwConfig } from "RnWConfig";
import { createGame as createServerGame } from "Services/RnWServer/Actions";
import type { RnWManagerState } from "./Model";

export type RnWManagerBaseAction = StartGameCreation | GameCreated | GameCreationFailed | JoinGame;

export type RnwManagerAction = AsyncAction<RnWManagerBaseAction, RnWManagerState>;
export type RnWManagerDispatch = Dispatch<RnwManagerAction>;

export function createGame(numberOfPlayers: number, piecesPerPlayer: number): RnwManagerAction {
    return async (dispatch) => {
        const tempId = crypto.randomUUID();
        try {
            dispatch(startGameCreation(tempId));
            const response = await createServerGame({
                boardRows: rnwConfig.boardSize.rows,
                boardColumns: rnwConfig.boardSize.columns,
                numberOfPlayers,
                piecesPerPlayer,
            });
            dispatch(gameCreated(tempId, response.gameId));
        } catch {
            dispatch(gameCreationFailed(tempId));
        }
    };
}

export type StartGameCreation = {
    type: "start-game-creation";
    tempId: string;
};
function startGameCreation(tempId: string): StartGameCreation {
    return {
        type: "start-game-creation",
        tempId,
    };
}

export type GameCreated = {
    type: "game-created";
    tempId: string;
    gameId: number;
};
function gameCreated(tempId: string, gameId: number): GameCreated {
    return {
        type: "game-created",
        tempId,
        gameId,
    };
}

export type GameCreationFailed = {
    type: "game-creation-failed";
    tempId: string;
};
function gameCreationFailed(tempId: string): GameCreationFailed {
    return {
        type: "game-creation-failed",
        tempId,
    };
}

export type JoinGame = {
    type: "join-game";
    gameId: number;
};
export function joinGame(gameId: number): JoinGame {
    // TODO: check if game exists and get metadata before joining
    return {
        type: "join-game",
        gameId,
    };
}
