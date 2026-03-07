import { useAuth } from "Domain/Auth/AuthContext";
import { getEnvConfig } from "EnvConfig";
import { confirmSignUp, signIn, signUp } from "Services/Auth/AuthService";
import { fetchAuthSession } from "@aws-amplify/auth";
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
    const { refresh } = useAuth();

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

            const session = await fetchAuthSession();
            const token = session.tokens?.idToken?.toString();
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

            await refresh();
            navigate("/");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Verification failed");
        }
    }

    if (step === "verify") {
        return (
            <div className="sign-up-page">
                <h2>Verify Your Email</h2>
                <p>Check your inbox for a verification code.</p>
                <form onSubmit={handleVerify}>
                    <label>
                        Code <input value={code} onChange={(e) => setCode(e.target.value)} required />
                    </label>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Verify</button>
                </form>
            </div>
        );
    }

    return (
        <div className="sign-up-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Display Name
                    <input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                        maxLength={30}
                    />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
