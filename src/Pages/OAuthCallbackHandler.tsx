import { loadUser } from "Domain/User/Actions";
import { useUserDispatch, useUserState } from "Domain/User/UserStateProvider";
import { getEnvConfig } from "EnvConfig";
import { getIdToken } from "Services/Auth/AuthService";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function OAuthCallbackHandler() {
    const navigate = useNavigate();
    const userState = useUserState();
    const dispatch = useUserDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
        if (userState.loading) return; // still loading

        if (userState.user.isGuest) {
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
    }, [userState.user, userState.loading, navigate]);

    return <p>Signing you in...</p>;
}
