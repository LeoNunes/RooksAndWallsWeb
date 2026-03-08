import type { CurrentUser } from "Domain/Auth/Model";
import {
    confirmSignUp,
    fetchAuthSession,
    fetchUserAttributes,
    getCurrentUser,
    signIn,
    signInWithRedirect,
    signOut,
    signUp,
} from "@aws-amplify/auth";

export async function getIdToken(): Promise<string | null> {
    try {
        const session = await fetchAuthSession();
        return session.tokens?.idToken?.toString() ?? null;
    } catch {
        return null;
    }
}

export async function getCurrentUserInfo(): Promise<CurrentUser> {
    try {
        const user = await getCurrentUser();
        return { userId: user.userId, isGuest: false };
    } catch {
        return { isGuest: true };
    }
}

export { signIn, signUp, signOut, confirmSignUp, signInWithRedirect, fetchUserAttributes };
