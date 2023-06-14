import React, { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { BoardStateData, boardStateDataInitialValue } from './Model';
import { BoardStateDataRaducer } from './Reducer';
import { BoardStateAction } from './Actions';

const BoardStateDataContext = createContext<BoardStateData | undefined>(undefined);
const BoardStateDataDispatchContext = createContext<Dispatch<BoardStateAction> | undefined>(undefined);

export function useBoardStateData() : BoardStateData {
    const data = useContext(BoardStateDataContext);
    if (data === undefined) {
        throw new Error("BoardStateData is not available. Do you have a BoardStateDataProvider providing it?");
    }
    return data;
}

export function useBoardStateDataDispatch() : Dispatch<BoardStateAction> {
    const dispatch = useContext(BoardStateDataDispatchContext);
    if (dispatch === undefined) {
        throw new Error("BoardStateDataDispatch is not available. Do you have a BoardStateDataProvider providing it?");
    }
    return dispatch;
}

type BoardStateDataProviderProps = PropsWithChildren<{}>;
export function BoardStateDataProvider(props: BoardStateDataProviderProps) {
    const [boardStateData, dispatch] = useReducer(BoardStateDataRaducer, boardStateDataInitialValue);

    return (
        <BoardStateDataContext.Provider value={boardStateData}>
            <BoardStateDataDispatchContext.Provider value={dispatch}>
                {props.children}
            </BoardStateDataDispatchContext.Provider>
        </BoardStateDataContext.Provider>
    );
}
