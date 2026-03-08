import { getAuthToken } from "Services/User/UserService";
import { useAsyncReducer } from "Util";
import { createContext, type PropsWithChildren, useContext, useEffect, useRef } from "react";
import type { UserDispatch } from "./Actions";
import { loadUser, tokenRefreshed } from "./Actions";
import { type UserState, userInitialState } from "./Model";
import { userReducer } from "./Reducer";

const TOKEN_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

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
    const tokenRef = useRef<string | null>(null);
    tokenRef.current = userState.user.isGuest ? null : userState.user.token;

    useEffect(() => {
        userDispatch(loadUser());
    }, [userDispatch]);

    useEffect(() => {
        const id = setInterval(async () => {
            const newToken = await getAuthToken();
            if (newToken !== null && newToken !== tokenRef.current) {
                userDispatch(tokenRefreshed(newToken));
            }
        }, TOKEN_REFRESH_INTERVAL_MS);
        return () => clearInterval(id);
    }, [userDispatch]);

    return (
        <UserStateContext.Provider value={userState}>
            <UserDispatchContext.Provider value={userDispatch}>{props.children}</UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}
