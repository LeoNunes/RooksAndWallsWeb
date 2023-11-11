import { Reducer, useEffect, useReducer, useRef } from 'react';
import { AsyncAction, AsyncDispatch } from '../Domain/Common/DataTypes';

export function useAsyncReducer<StateType, ActionType extends object>(
    reducer: Reducer<StateType, ActionType>,
    initialValue: StateType,
): [StateType, AsyncDispatch<ActionType, StateType>] {
    const [baseState, baseDispatch] = useReducer(reducer, initialValue);

    const intermediateState = useRef(baseState);
    useEffect(() => {
        intermediateState.current = baseState;
    }, [baseState]);

    function getState(): StateType {
        return intermediateState.current;
    }

    function dispatchAndUpdateIntermediateState(action: ActionType): void {
        intermediateState.current = reducer(intermediateState.current, action);
        baseDispatch(action);
    }

    async function asyncDispatch(action: AsyncAction<ActionType, StateType>) {
        if (typeof action === 'function') {
            await action(asyncDispatch, getState);
        } else {
            dispatchAndUpdateIntermediateState(action);
        }
    }

    return [baseState, asyncDispatch];
}
