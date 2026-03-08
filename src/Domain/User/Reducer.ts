import type { UserBaseAction } from "./Actions";
import type { UserState } from "./Model";

export function userReducer(state: UserState, action: UserBaseAction): UserState {
    switch (action.type) {
        case "user-loading":
            return { ...state, loading: true };
        case "user-loaded":
            return { ...state, user: action.user, loading: false };
    }
}
