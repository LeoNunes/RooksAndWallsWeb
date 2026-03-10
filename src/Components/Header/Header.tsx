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
            <Link to="/" className="app-header__logo">
                <span className="app-header__logo-icon">♜</span>
                <span className="app-header__logo-text">LeoGames</span>
            </Link>
            <nav className="app-header__nav">
                {userState.user.isGuest ? (
                    <>
                        <Link to="/sign-in" className="app-header__nav-link">
                            Sign In
                        </Link>
                        <Link to="/sign-up" className="app-header__nav-link app-header__nav-link--cta">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="app-header__nav-link">
                            {userState.user.displayName}
                        </Link>
                        <button type="button" className="app-header__signout" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}
