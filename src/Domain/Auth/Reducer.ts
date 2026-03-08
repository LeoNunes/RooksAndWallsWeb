import type { AuthBaseAction } from "./Actions";
import type { AuthState } from "./Model";

export function authReducer(state: AuthState, action: AuthBaseAction): AuthState {
    switch (action.type) {
        case "user-loaded":
            return { ...state, user: action.user };
    }
}
