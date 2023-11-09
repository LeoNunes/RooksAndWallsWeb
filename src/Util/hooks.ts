import { Reducer, useReducer } from 'react';
import { AsyncAction, AsyncDispatch } from '../Data/Common/DataTypes';

export function useAsyncReducer<StateType, ActionType extends object>(
    reducer: Reducer<StateType, ActionType>,
    initialValue: StateType,
): [StateType, AsyncDispatch<ActionType, StateType>] {
    const [baseState, baseDispatch] = useReducer(reducer, initialValue);

    // TODO: Test if function returns different values on a single action if state changes.
    // useState + useEffect if that doesnt work?
    function getState() {
        return baseState;
    }

    async function asyncDispatch(action: AsyncAction<ActionType, StateType>) {
        if (typeof action === 'function') {
            await action(baseDispatch, getState);
        } else {
            baseDispatch(action);
        }
    }

    return [baseState, asyncDispatch];
}
