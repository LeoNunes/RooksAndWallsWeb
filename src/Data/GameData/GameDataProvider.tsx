import { createContext, useReducer, PropsWithChildren, Dispatch, useContext } from 'react';
import { GameData, gameDataInitialValue } from './Model';
import { gameDataReducer } from './Reducer';
import { GameDataAction } from './Actions';

const GameDataContext = createContext<GameData | undefined>(undefined);
const GameDataDispatchContext = createContext<Dispatch<GameDataAction> | undefined>(undefined);

export function useGameData() : GameData {
    const gameData = useContext(GameDataContext);
    if (gameData === undefined) {
        throw new Error("GameData is not available. Do you have a GameDataProvider providing it?");
    }
    return gameData;
}

export function useGameDataDispatch() : Dispatch<GameDataAction> {
    const dispatch = useContext(GameDataDispatchContext);
    if (dispatch === undefined) {
        throw new Error("GameDataDispatch is not available. Do you have a GameDataProvider providing it?")
    }
    return dispatch;
}

type GameDataProviderProps = PropsWithChildren<{}>;
export function GameDataProvider(props: GameDataProviderProps) {
    const [gameData, gameDataDispatch] = useReducer(gameDataReducer, gameDataInitialValue);

    return (
        <GameDataContext.Provider value={gameData}>
            <GameDataDispatchContext.Provider value={gameDataDispatch}>
                {props.children}
            </GameDataDispatchContext.Provider>
        </GameDataContext.Provider>
    );
}
