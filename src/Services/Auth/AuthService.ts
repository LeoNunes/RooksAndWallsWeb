import { getEnvConfig } from "EnvConfig";
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

export type CognitoUser = { userId: string; isGuest: false } | { isGuest: true };

export async function getCurrentUserInfo(): Promise<CognitoUser> {
    try {
        const user = await getCurrentUser();
        return { userId: user.userId, isGuest: false };
    } catch {
        return { isGuest: true };
    }
}

export async function getUserProfile(token: string): Promise<{ displayName: string } | null> {
    try {
        const res = await fetch(`${getEnvConfig().apiBaseUrl}/rw/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export { signIn, signUp, signOut, confirmSignUp, signInWithRedirect, fetchUserAttributes };
