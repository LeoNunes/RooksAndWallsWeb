import { loadUser } from "Domain/User/Actions";
import { useUserDispatch } from "Domain/User/UserStateProvider";
import { getAuthToken, registerUser } from "Services/User/UserService";
import { useState } from "react";
import { useNavigate } from "react-router";

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
