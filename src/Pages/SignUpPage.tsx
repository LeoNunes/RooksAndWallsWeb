import { loadUser } from "Domain/User/Actions";
import { useUserDispatch } from "Domain/User/UserStateProvider";
import { getEnvConfig } from "EnvConfig";
import { confirmSignUp, getAuthToken, signIn, signInWithRedirect, signUp } from "Services/User/UserService";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./SignUpPage.css";

export default function SignUpPage() {
    const [step, setStep] = useState<"form" | "verify">("form");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useUserDispatch();

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        try {
            await signUp({ username: email, password, options: { userAttributes: { email } } });
            setStep("verify");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Sign up failed");
        }
    }

    async function handleVerify(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        try {
            await confirmSignUp({ username: email, confirmationCode: code });
            await signIn({ username: email, password });

            const token = await getAuthToken();
            const res = await fetch(`${getEnvConfig().apiBaseUrl}/rw/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ displayName }),
            });

            if (res.status === 409) {
                setError("Display name is already taken. Please go back and choose another.");
                return;
            }
            if (!res.ok) throw new Error("Failed to create profile");

            dispatch(loadUser());
            navigate("/");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Verification failed");
        }
    }

    if (step === "verify") {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-card__title">Verify Email</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 0 }}>
                        Check your inbox and enter the code we sent to <strong>{email}</strong>.
                    </p>
                    <form className="auth-form" onSubmit={handleVerify}>
                        <div className="auth-field">
                            <label htmlFor="code">Verification Code</label>
                            <input
                                id="code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="auth-error">{error}</p>}
                        <button type="submit" className="auth-btn">
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-card__title">Sign Up</h2>
                <form className="auth-form" onSubmit={handleSignUp}>
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
                    <div className="auth-field">
                        <label htmlFor="displayName">Display Name</label>
                        <input
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                            maxLength={30}
                        />
                    </div>
                    {error && <p className="auth-error">{error}</p>}
                    <button type="submit" className="auth-btn">
                        Continue
                    </button>
                </form>
                <div className="auth-divider">or</div>
                <button
                    type="button"
                    className="auth-btn auth-btn--google"
                    onClick={() => signInWithRedirect({ provider: "Google" })}
                >
                    Sign Up with Google
                </button>
                <p className="auth-footer">
                    Have an account? <a href="/sign-in">Sign in</a>
                </p>
            </div>
        </div>
    );
}
