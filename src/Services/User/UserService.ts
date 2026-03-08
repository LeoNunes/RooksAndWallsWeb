import { getEnvConfig } from "EnvConfig";
import {
    confirmSignUp,
    fetchAuthSession,
    fetchUserAttributes,
    signIn,
    signInWithRedirect,
    signOut,
    signUp,
} from "@aws-amplify/auth";
import type { UserProfile } from "./Data";

export async function getAuthToken(): Promise<string | null> {
    try {
        const session = await fetchAuthSession();
        return session.tokens?.idToken?.toString() ?? null;
    } catch {
        return null;
    }
}

export async function getUserProfile(token: string): Promise<UserProfile | null> {
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
