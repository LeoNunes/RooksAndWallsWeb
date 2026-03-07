import { useAuth } from "Domain/Auth/AuthContext";
import { getEnvConfig } from "EnvConfig";
import { getIdToken, signOut } from "Services/Auth/AuthService";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./Header.css";

export default function Header() {
    const { user, refresh } = useAuth();
    const [displayName, setDisplayName] = useState<string | null>(null);

    useEffect(() => {
        if (!user || user.isGuest) {
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
    }, [user]);

    async function handleSignOut() {
        await signOut();
        await refresh();
    }

    return (
        <header className="app-header">
            <span className="app-header__title">Rooks &amp; Walls</span>
            <nav className="app-header__nav">
                {user === null || user.isGuest ? (
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
