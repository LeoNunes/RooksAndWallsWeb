import { loadUser } from "Domain/User/Actions";
import { useUserDispatch } from "Domain/User/UserStateProvider";
import { getAuthToken, registerUser } from "Services/User/UserService";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./SignInPage.css";

export default function RegisterUserPage() {
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useUserDispatch();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const token = await getAuthToken();
        if (!token) {
            setError("Failed to save name");
            return;
        }
        const result = await registerUser(token, displayName);
        if (!result.success) {
            setError(result.error === "name-taken" ? "Name taken, try another" : "Failed to save name");
            return;
        }
        dispatch(loadUser());
        navigate("/");
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-card__title">Choose a Name</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 0 }}>
                    Pick a display name that other players will see.
                </p>
                <form className="auth-form" onSubmit={handleSubmit}>
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
                        Save Name
                    </button>
                </form>
            </div>
        </div>
    );
}
