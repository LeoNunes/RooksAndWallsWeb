import type { UserBaseAction } from "./Actions";
import type { UserState } from "./Model";

export function userReducer(state: UserState, action: UserBaseAction): UserState {
    switch (action.type) {
        case "user-loading":
            return { ...state, loading: true };
        case "user-loaded":
            return { ...state, user: action.user, loading: false };
        case "token-refreshed":
            if (state.user.isGuest) return state;
            return { ...state, user: { ...state.user, token: action.token } };
    }
}
