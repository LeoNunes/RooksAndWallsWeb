import { Reducer, useCallback, useReducer, useRef, useState } from 'react';
import { AsyncAction, AsyncDispatch } from '../Domain/Common/DataTypes';

export function useAsyncReducer<StateType, ActionType extends object>(
    reducer: Reducer<StateType, ActionType>,
    initialValue: StateType,
): [StateType, AsyncDispatch<ActionType, StateType>] {
    const [baseState, baseDispatch] = useReducer(reducer, initialValue);

    const intermediateState = useRef(baseState);
    intermediateState.current = baseState;

    const asyncDispatch = useCallback(
        async (action: AsyncAction<ActionType, StateType>) => {
            function getState(): StateType {
                return intermediateState.current;
            }

            function dispatchAndUpdateIntermediateState(action: ActionType): void {
                intermediateState.current = reducer(intermediateState.current, action);
                baseDispatch(action);
            }

            if (typeof action === 'function') {
                await action(asyncDispatch, getState);
            } else {
                dispatchAndUpdateIntermediateState(action);
            }
        },
        [reducer, intermediateState],
    );

    return [baseState, asyncDispatch];
}

export function useGetter<S>(value: S): () => S {
    const valueRef = useRef(value);
    valueRef.current = value;
    return useCallback(() => valueRef.current, [valueRef]);
}

export function useGetState<S>(
    initialState: S | (() => S),
): [() => S, React.Dispatch<React.SetStateAction<S>>] {
    const [state, setState] = useState(initialState);
    const getState = useGetter(state);

    return [getState, setState];
}
