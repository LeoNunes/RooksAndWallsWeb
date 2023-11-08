import React, { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { BoardData, boardDataInitialValue } from './Model';
import { BoardDataRaducer } from './Reducer';
import { BoardAction } from './Actions';

const BoardDataContext = createContext<BoardData | undefined>(undefined);
const BoardDataDispatchContext = createContext<Dispatch<BoardAction> | undefined>(undefined);

export function useBoardData(): BoardData {
    const data = useContext(BoardDataContext);
    if (data === undefined) {
        throw new Error(
            'BoardData is not available. Do you have a BoardDataProvider providing it?',
        );
    }
    return data;
}

export function useBoardDataDispatch(): Dispatch<BoardAction> {
    const dispatch = useContext(BoardDataDispatchContext);
    if (dispatch === undefined) {
        throw new Error(
            'BoardDataDispatch is not available. Do you have a BoardDataProvider providing it?',
        );
    }
    return dispatch;
}

type BoardDataProviderProps = PropsWithChildren<{}>;
export function BoardDataProvider(props: BoardDataProviderProps) {
    const [boardStateData, dispatch] = useReducer(BoardDataRaducer, boardDataInitialValue);

    return (
        <BoardDataContext.Provider value={boardStateData}>
            <BoardDataDispatchContext.Provider value={dispatch}>
                {props.children}
            </BoardDataDispatchContext.Provider>
        </BoardDataContext.Provider>
    );
}
