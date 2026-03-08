import { signOut } from "Domain/User/Actions";
import { useUserDispatch, useUserState } from "Domain/User/UserStateProvider";
import { Link } from "react-router";
import "./Header.css";

export default function Header() {
    const userState = useUserState();
    const dispatch = useUserDispatch();

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <header className="app-header">
            <span className="app-header__title">Rooks &amp; Walls</span>
            <nav className="app-header__nav">
                {userState.user.isGuest ? (
                    <>
                        <Link to="/sign-in">Sign In</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </>
                ) : (
                    <>
                        <span>{userState.user.displayName}</span>
                        <button type="button" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}
