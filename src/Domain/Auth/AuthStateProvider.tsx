import { useAsyncReducer } from "Util";
import { createContext, type PropsWithChildren, useContext, useEffect } from "react";
import type { AuthDispatch } from "./Actions";
import { loadUser } from "./Actions";
import type { AuthState } from "./Model";
import { authInitialState } from "./Model";
import { authReducer } from "./Reducer";

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined);

export function useAuthState(): AuthState {
    const authState = useContext(AuthStateContext);
    if (authState === undefined) {
        throw new Error("AuthState is not available. Do you have an AuthStateProvider providing it?");
    }
    return authState;
}

export function useAuthDispatch(): AuthDispatch {
    const dispatch = useContext(AuthDispatchContext);
    if (dispatch === undefined) {
        throw new Error("AuthDispatch is not available. Do you have an AuthStateProvider providing it?");
    }
    return dispatch;
}

// biome-ignore lint/complexity/noBannedTypes: I need an empty object
type AuthStateProviderProps = PropsWithChildren<{}>;
export function AuthStateProvider(props: AuthStateProviderProps) {
    const [authState, authDispatch] = useAsyncReducer(authReducer, authInitialState);

    useEffect(() => {
        authDispatch(loadUser());
    }, [authDispatch]);

    return (
        <AuthStateContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={authDispatch}>{props.children}</AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}
