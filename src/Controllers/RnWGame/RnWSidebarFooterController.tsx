import SidebarFooter, { type SidebarFooterButton } from "Components/SidebarFooter/SidebarFooter";
import { createAction } from "Domain/RnW/Actions";
import { useRnWDispatch, useRnWState } from "Domain/RnW/RnWStateProvider";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export default function RnWSidebarFooterController() {
    const state = useRnWState();
    const dispatch = useRnWDispatch();
    const navigate = useNavigate();

    const props = useMemo(() => {
        if (state.stage === "waiting_for_players") {
            const rnwActions = createAction(dispatch);
            const waitingCount = state.numberOfPlayers - state.players.length;
            const message =
                waitingCount > 0
                    ? `Waiting for ${waitingCount} more player${waitingCount !== 1 ? "s" : ""} to join\u2026`
                    : undefined;
            const buttons: SidebarFooterButton[] = [
                { label: "Add AI", variant: "primary", onClick: () => rnwActions.addAi(state.gameId) },
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
    }, [state.gameId, state.stage, state.numberOfPlayers, state.players.length, navigate, dispatch]);

    if (!props) return null;
    return <SidebarFooter {...props} />;
}
