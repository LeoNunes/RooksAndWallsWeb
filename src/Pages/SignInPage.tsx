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
        <div className="sign-in-page">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign In</button>
            </form>
            <button type="button" onClick={() => signInWithRedirect({ provider: "Google" })}>
                Sign in with Google
            </button>
            <p>
                No account? <a href="/sign-up">Sign up</a>
            </p>
        </div>
    );
}
