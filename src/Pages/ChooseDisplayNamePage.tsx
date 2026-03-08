import { loadUser } from "Domain/Auth/Actions";
import { useAuthDispatch } from "Domain/Auth/AuthStateProvider";
import { getEnvConfig } from "EnvConfig";
import { getIdToken } from "Services/Auth/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ChooseDisplayNamePage() {
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useAuthDispatch();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const token = await getIdToken();
        const res = await fetch(`${getEnvConfig().apiBaseUrl}/rw/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ displayName }),
        });
        if (res.status === 409) {
            setError("Name taken, try another");
            return;
        }
        if (!res.ok) {
            setError("Failed to save name");
            return;
        }
        dispatch(loadUser());
        navigate("/");
    }

    return (
        <div>
            <h2>Choose a display name</h2>
            <form onSubmit={handleSubmit}>
                <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} required maxLength={30} />
                {error && <p>{error}</p>}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
