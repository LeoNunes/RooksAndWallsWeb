import { loadUser } from "Domain/User/Actions";
import { useUserDispatch, useUserState } from "Domain/User/UserStateProvider";
import { registrationStatus } from "Services/User/UserService";
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

        const { user } = userState;
        async function checkProfile() {
            const status = await registrationStatus(user.token);
            navigate(status === "unregistered" ? "/register-user" : "/");
        }
        checkProfile();
    }, [userState.user, userState.loading, navigate, userState]);

    return <p>Signing you in...</p>;
}
