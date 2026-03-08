import type { AsyncAction, Dispatch } from "Domain/Common/DataTypes";
import { getAuthToken, getUserProfile, signOut as signOutService } from "Services/User/UserService";
import type { CurrentUser, UserState } from "./Model";

export type UserBaseAction = UserLoading | UserLoaded | TokenRefreshed;

export type UserAction = AsyncAction<UserBaseAction, UserState>;
export type UserDispatch = Dispatch<UserAction>;

export type UserLoading = {
    type: "user-loading";
};
function userLoading(): UserLoading {
    return { type: "user-loading" };
}

export type UserLoaded = {
    type: "user-loaded";
    user: CurrentUser;
};
function userLoaded(user: CurrentUser): UserLoaded {
    return { type: "user-loaded", user };
}

export type TokenRefreshed = {
    type: "token-refreshed";
    token: string;
};
export function tokenRefreshed(token: string): TokenRefreshed {
    return { type: "token-refreshed", token };
}

export function loadUser(): UserAction {
    return async (dispatch) => {
        dispatch(userLoading());
        const token = await getAuthToken();
        if (!token) {
            dispatch(userLoaded({ isGuest: true, displayName: "Guest" }));
            return;
        }
        const profile = await getUserProfile(token);
        if (!profile) {
            dispatch(userLoaded({ isGuest: true, displayName: "Guest" }));
            return;
        }
        dispatch(userLoaded({ userId: profile.userId, isGuest: false, displayName: profile.displayName, token }));
    };
}

export function signOut(): UserAction {
    return async (dispatch) => {
        dispatch(userLoading());
        await signOutService();
        dispatch(userLoaded({ isGuest: true, displayName: "Guest" }));
    };
}
