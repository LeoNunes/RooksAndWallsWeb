import { signOut } from "Domain/User/Actions";
import { useUserDispatch, useUserState } from "Domain/User/UserStateProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./ProfilePage.css";

export default function ProfilePage() {
    const userState = useUserState();
    const dispatch = useUserDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userState.loading && userState.user.isGuest) {
            navigate("/sign-in");
        }
    }, [userState.loading, userState.user.isGuest, navigate]);

    function handleSignOut() {
        dispatch(signOut());
        navigate("/");
    }

    if (userState.loading || userState.user.isGuest) {
        return null;
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-card__icon">♜</div>
                <h2 className="profile-card__name">{userState.user.displayName}</h2>
                <p className="profile-card__label">Player Profile</p>
                <div className="profile-card__divider" />
                <button type="button" className="profile-signout" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}
