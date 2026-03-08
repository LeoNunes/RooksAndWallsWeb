import { loadUser } from "Domain/User/Actions";
import { useUserDispatch } from "Domain/User/UserStateProvider";
import { getEnvConfig } from "EnvConfig";
import { getAuthToken } from "Services/User/UserService";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ChooseDisplayNamePage() {
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useUserDispatch();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const token = await getAuthToken();
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
