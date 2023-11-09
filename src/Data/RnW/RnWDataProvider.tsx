import { createContext, PropsWithChildren, useContext } from 'react';
import { useAsyncReducer } from '../../Util/hooks';
import { RnWState, rnwStateInitialValue } from './Model';
import { rnwReducer } from './Reducer';
import { RnWDispatch } from './Actions';

const RnWStateContext = createContext<RnWState | undefined>(undefined);
const RnWDispatchContext = createContext<RnWDispatch | undefined>(undefined);

export function useRnWState(): RnWState {
    const rnwState = useContext(RnWStateContext);
    if (rnwState === undefined) {
        throw new Error('RnWState is not available. Do you have a RnWStateProvider providing it?');
    }
    return rnwState;
}

export function useRnWDispatch(): RnWDispatch {
    const dispatch = useContext(RnWDispatchContext);
    if (dispatch === undefined) {
        throw new Error('RnWDispatch is not available. Do you have a RnWProvider providing it?');
    }
    return dispatch;
}

type RnWStateProviderProps = PropsWithChildren<{}>;
export function RnWStateProvider(props: RnWStateProviderProps) {
    const [rnwState, rnwDispatch] = useAsyncReducer(rnwReducer, rnwStateInitialValue);

    return (
        <RnWStateContext.Provider value={rnwState}>
            <RnWDispatchContext.Provider value={rnwDispatch}>
                {props.children}
            </RnWDispatchContext.Provider>
        </RnWStateContext.Provider>
    );
}
