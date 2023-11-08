import { createContext, useReducer, PropsWithChildren, Dispatch, useContext } from 'react';
import { RnWData, rnwDataInitialValue } from './Model';
import { rnwDataReducer } from './Reducer';
import { RnWAction } from './Actions';

const RnWDataContext = createContext<RnWData | undefined>(undefined);
const RnWDataDispatchContext = createContext<Dispatch<RnWAction> | undefined>(undefined);

export function useRnWData() : RnWData {
    const rnwData = useContext(RnWDataContext);
    if (rnwData === undefined) {
        throw new Error("RnWData is not available. Do you have a RnWDataProvider providing it?");
    }
    return rnwData;
}

export function useRnWDataDispatch() : Dispatch<RnWAction> {
    const dispatch = useContext(RnWDataDispatchContext);
    if (dispatch === undefined) {
        throw new Error("RnWDataDispatch is not available. Do you have a RnWDataProvider providing it?")
    }
    return dispatch;
}

type RnWDataProviderProps = PropsWithChildren<{}>;
export function RnWDataProvider(props: RnWDataProviderProps) {
    const [rnwData, rnwDataDispatch] = useReducer(rnwDataReducer, rnwDataInitialValue);

    return (
        <RnWDataContext.Provider value={rnwData}>
            <RnWDataDispatchContext.Provider value={rnwDataDispatch}>
                {props.children}
            </RnWDataDispatchContext.Provider>
        </RnWDataContext.Provider>
    );
}
