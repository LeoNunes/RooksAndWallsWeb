import type { AsyncAction, Dispatch } from "Domain/Common/DataTypes";
import { getCurrentUserInfo, signOut as signOutService } from "Services/Auth/AuthService";
import type { AuthState, CurrentUser } from "./Model";

export type AuthBaseAction = UserLoaded;

export type AuthAction = AsyncAction<AuthBaseAction, AuthState>;
export type AuthDispatch = Dispatch<AuthAction>;

export type UserLoaded = {
    type: "user-loaded";
    user: CurrentUser;
};
function userLoaded(user: CurrentUser): UserLoaded {
    return { type: "user-loaded", user };
}

export function loadUser(): AuthAction {
    return async (dispatch) => {
        const user = await getCurrentUserInfo();
        dispatch(userLoaded(user));
    };
}

export function signOut(): AuthAction {
    return async (dispatch) => {
        await signOutService();
        dispatch(userLoaded({ isGuest: true }));
    };
}
