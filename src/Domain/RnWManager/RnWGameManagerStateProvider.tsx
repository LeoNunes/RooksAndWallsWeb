import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { useAsyncReducer } from '../../Util';
import { RnWManagerState, rnwManagerInitialState } from './Model';
import { rnwManagerReducer } from './Reducer';
import { RnWManagerDispatch } from './Actions';

const RnWManagerStateContext = createContext<RnWManagerState | undefined>(undefined);
const RnWManagerDispatchContext = createContext<RnWManagerDispatch | undefined>(undefined);

export function useRnWManagerState(): RnWManagerState {
    const rnwManagerState = useContext(RnWManagerStateContext);
    if (rnwManagerState === undefined) {
        throw new Error(
            'RnWManagerState is not available. Do you have a RnWManagerStateProvider providing it?',
        );
    }
    return rnwManagerState;
}

export function useRnWManagerDispatch(): RnWManagerDispatch {
    const dispatch = useContext(RnWManagerDispatchContext);
    if (dispatch === undefined) {
        throw new Error(
            'RnWManagerDispatch is not available. Do you have a RnWManagerStateProvider providing it?',
        );
    }
    return dispatch;
}

type RnWManagerStateProviderProps = PropsWithChildren<{}>;
export function RnWManagerStateProvider(props: RnWManagerStateProviderProps) {
    const [rnwManagerState, rnwManagerDispatch] = useAsyncReducer(
        rnwManagerReducer,
        rnwManagerInitialState,
    );

    useEffect(() => console.debug('rnwManagerState', rnwManagerState), [rnwManagerState]);

    return (
        <RnWManagerStateContext.Provider value={rnwManagerState}>
            <RnWManagerDispatchContext.Provider value={rnwManagerDispatch}>
                {props.children}
            </RnWManagerDispatchContext.Provider>
        </RnWManagerStateContext.Provider>
    );
}
