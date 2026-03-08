import type { AsyncAction, Dispatch } from "Domain/Common/DataTypes";
import { getCurrentUserInfo, getIdToken, getUserProfile, signOut as signOutService } from "Services/Auth/AuthService";
import type { CurrentUser, UserState } from "./Model";

export type UserBaseAction = UserLoading | UserLoaded;

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

export function loadUser(): UserAction {
    return async (dispatch) => {
        dispatch(userLoading());
        const cognitoUser = await getCurrentUserInfo();
        if (cognitoUser.isGuest) {
            dispatch(userLoaded({ isGuest: true, displayName: "Guest" }));
            return;
        }
        const token = await getIdToken();
        const profile = token ? await getUserProfile(token) : null;
        dispatch(
            userLoaded({
                userId: cognitoUser.userId,
                isGuest: false,
                displayName: profile?.displayName ?? "",
            }),
        );
    };
}

export function signOut(): UserAction {
    return async (dispatch) => {
        dispatch(userLoading());
        await signOutService();
        dispatch(userLoaded({ isGuest: true, displayName: "Guest" }));
    };
}
