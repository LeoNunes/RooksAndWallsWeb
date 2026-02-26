import SidebarFooter, { type SidebarFooterButton } from "Components/SidebarFooter/SidebarFooter";
import { useRnWState } from "Domain/RnW/RnWStateProvider";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export default function RnWSidebarFooterController() {
    const state = useRnWState();
    const navigate = useNavigate();

    const props = useMemo(() => {
        if (state.stage === "waiting_for_players") {
            const waitingCount = state.numberOfPlayers - state.players.length;
            const message =
                waitingCount > 0
                    ? `Waiting for ${waitingCount} more player${waitingCount !== 1 ? "s" : ""} to join\u2026`
                    : undefined;
            const buttons: SidebarFooterButton[] = [
                { label: "Leave Lobby", variant: "secondary", onClick: () => navigate("/") },
            ];
            return { message, buttons };
        }

        if (state.stage === "completed") {
            const buttons: SidebarFooterButton[] = [
                { label: "Back to Main Menu", variant: "secondary", onClick: () => navigate("/") },
            ];
            return { buttons };
        }

        return undefined;
    }, [state.stage, state.numberOfPlayers, state.players.length, navigate]);

    if (!props) return null;
    return <SidebarFooter {...props} />;
}
