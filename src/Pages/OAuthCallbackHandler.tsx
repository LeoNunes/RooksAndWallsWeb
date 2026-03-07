import { useAuth } from "Domain/Auth/AuthContext";
import { getEnvConfig } from "EnvConfig";
import { getIdToken } from "Services/Auth/AuthService";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function OAuthCallbackHandler() {
    const navigate = useNavigate();
    const { user, refresh } = useAuth();

    useEffect(() => {
        async function handleCallback() {
            await refresh();
        }
        handleCallback();
    }, [refresh]);

    useEffect(() => {
        if (user === null) return; // still loading

        if (user.isGuest) {
            // Auth failed or was cancelled
            navigate("/sign-in");
            return;
        }

        async function checkProfile() {
            const token = await getIdToken();
            const res = await fetch(`${getEnvConfig().apiBaseUrl}/rw/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 404) {
                navigate("/choose-display-name");
            } else {
                navigate("/");
            }
        }
        checkProfile();
    }, [user, navigate]);

    return <p>Signing you in...</p>;
}
