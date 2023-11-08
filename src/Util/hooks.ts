import { Reducer, useReducer } from 'react';
import { AsyncAction, AsyncDispatch } from '../Data/Common/DataTypes';

export function useAsyncReducer<StateType, ActionType extends object>(
    reducer: Reducer<StateType, ActionType>,
    initialValue: StateType,
): [StateType, AsyncDispatch<ActionType>] {
    const [baseState, baseDispatch] = useReducer(reducer, initialValue);

    async function asyncDispatch(action: AsyncAction<ActionType>) {
        if (typeof action === 'function') {
            await action(baseDispatch);
        } else {
            baseDispatch(action);
        }
    }

    return [baseState, asyncDispatch];
}
