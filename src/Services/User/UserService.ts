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
import type { RegisterUserResult, RegistrationStatus, UserProfile } from "./Data";

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

export async function registrationStatus(token: string): Promise<RegistrationStatus> {
    const res = await fetch(`${getEnvConfig().apiBaseUrl}/rw/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.status === 404 ? "unregistered" : "registered";
}

export async function registerUser(token: string, displayName: string): Promise<RegisterUserResult> {
    const res = await fetch(`${getEnvConfig().apiBaseUrl}/rw/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ displayName }),
    });
    if (res.status === 409) return { success: false, error: "name-taken" };
    if (!res.ok) return { success: false, error: "server-error" };
    return { success: true };
}

export { signIn, signUp, signOut, confirmSignUp, signInWithRedirect, fetchUserAttributes };
