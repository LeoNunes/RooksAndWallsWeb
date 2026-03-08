import { signOut } from "Domain/Auth/Actions";
import { useAuthDispatch, useAuthState } from "Domain/Auth/AuthStateProvider";
import { getEnvConfig } from "EnvConfig";
import { getIdToken } from "Services/Auth/AuthService";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./Header.css";

export default function Header() {
    const authState = useAuthState();
    const dispatch = useAuthDispatch();
    const [displayName, setDisplayName] = useState<string | null>(null);

    useEffect(() => {
        if (!authState.user || authState.user.isGuest) {
            setDisplayName(null);
            return;
        }
        getIdToken().then((token) => {
            if (!token) return;
            fetch(`${getEnvConfig().apiBaseUrl}/rw/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((r) => (r.ok ? r.json() : null))
                .then((data) => setDisplayName(data?.displayName ?? null));
        });
    }, [authState.user]);

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <header className="app-header">
            <span className="app-header__title">Rooks &amp; Walls</span>
            <nav className="app-header__nav">
                {authState.user === null || authState.user.isGuest ? (
                    <>
                        <Link to="/sign-in">Sign In</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </>
                ) : (
                    <>
                        <span>{displayName ?? "..."}</span>
                        <button type="button" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}
