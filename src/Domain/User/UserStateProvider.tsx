import { useAsyncReducer } from "Util";
import { createContext, type PropsWithChildren, useContext, useEffect } from "react";
import type { UserDispatch } from "./Actions";
import { loadUser } from "./Actions";
import type { UserState } from "./Model";
import { userInitialState } from "./Model";
import { userReducer } from "./Reducer";

const UserStateContext = createContext<UserState | undefined>(undefined);
const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

export function useUserState(): UserState {
    const userState = useContext(UserStateContext);
    if (userState === undefined) {
        throw new Error("UserState is not available. Do you have a UserStateProvider providing it?");
    }
    return userState;
}

export function useUserDispatch(): UserDispatch {
    const dispatch = useContext(UserDispatchContext);
    if (dispatch === undefined) {
        throw new Error("UserDispatch is not available. Do you have a UserStateProvider providing it?");
    }
    return dispatch;
}

// biome-ignore lint/complexity/noBannedTypes: I need an empty object
type UserStateProviderProps = PropsWithChildren<{}>;
export function UserStateProvider(props: UserStateProviderProps) {
    const [userState, userDispatch] = useAsyncReducer(userReducer, userInitialState);

    useEffect(() => {
        userDispatch(loadUser());
    }, [userDispatch]);

    return (
        <UserStateContext.Provider value={userState}>
            <UserDispatchContext.Provider value={userDispatch}>{props.children}</UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}
