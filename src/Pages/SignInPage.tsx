import { loadUser } from "Domain/User/Actions";
import { useUserDispatch } from "Domain/User/UserStateProvider";
import { signIn, signInWithRedirect } from "Services/User/UserService";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./SignInPage.css";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useUserDispatch();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        try {
            await signIn({ username: email, password });
            dispatch(loadUser());
            navigate("/");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Sign in failed");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-card__title">Sign In</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="auth-error">{error}</p>}
                    <button type="submit" className="auth-btn">
                        Sign In
                    </button>
                </form>
                <div className="auth-divider">or</div>
                <button
                    type="button"
                    className="auth-btn auth-btn--google"
                    onClick={() => signInWithRedirect({ provider: "Google" })}
                >
                    Sign In with Google
                </button>
                <p className="auth-footer">
                    No account? <a href="/sign-up">Sign up</a>
                </p>
            </div>
        </div>
    );
}
