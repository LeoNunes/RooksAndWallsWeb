import { loadUser } from "Domain/Auth/Actions";
import { useAuthDispatch, useAuthState } from "Domain/Auth/AuthStateProvider";
import { getEnvConfig } from "EnvConfig";
import { getIdToken } from "Services/Auth/AuthService";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function OAuthCallbackHandler() {
    const navigate = useNavigate();
    const authState = useAuthState();
    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
        if (authState.user === null) return; // still loading

        if (authState.user.isGuest) {
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
    }, [authState.user, navigate]);

    return <p>Signing you in...</p>;
}
