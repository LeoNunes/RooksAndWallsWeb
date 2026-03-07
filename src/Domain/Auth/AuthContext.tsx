import { type CurrentUser, getCurrentUserInfo } from "Services/Auth/AuthService";
import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

type AuthState = {
    user: CurrentUser | null; // null = loading
    refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<CurrentUser | null>(null);

    const refresh = useCallback(async () => {
        const u = await getCurrentUserInfo();
        setUser(u);
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return <AuthContext.Provider value={{ user, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
