import AiDifficultyPicker from "Components/AiDifficultyPicker/AiDifficultyPicker";
import SidebarFooter, { type SidebarFooterButton } from "Components/SidebarFooter/SidebarFooter";
import { createAction } from "Domain/RnW/Actions";
import { useRnWDispatch, useRnWState } from "Domain/RnW/RnWStateProvider";
import type { AiDifficulty } from "Services/RnWServer/Data";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

export default function RnWSidebarFooterController() {
    const state = useRnWState();
    const dispatch = useRnWDispatch();
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState<AiDifficulty>("MEDIUM");

    const waitingProps = useMemo(() => {
        if (state.stage !== "waiting_for_players") return undefined;
        const rnwActions = createAction(dispatch);
        const waitingCount = state.numberOfPlayers - state.players.length;
        const message =
            waitingCount > 0
                ? `Waiting for ${waitingCount} more player${waitingCount !== 1 ? "s" : ""} to join\u2026`
                : undefined;
        const buttons: SidebarFooterButton[] = [
            { label: "Add AI", variant: "primary", onClick: () => rnwActions.addAi(state.gameId, difficulty) },
            { label: "Leave Lobby", variant: "secondary", onClick: () => navigate("/") },
        ];
        return { message, buttons };
    }, [state.gameId, state.stage, state.numberOfPlayers, state.players.length, navigate, dispatch, difficulty]);

    if (state.stage === "waiting_for_players" && waitingProps) {
        return (
            <>
                <AiDifficultyPicker value={difficulty} onChange={setDifficulty} />
                <SidebarFooter buttons={waitingProps.buttons} message={waitingProps.message} />
            </>
        );
    }

    if (state.stage === "completed") {
        const buttons: SidebarFooterButton[] = [
            { label: "Back to Main Menu", variant: "secondary", onClick: () => navigate("/") },
        ];
        return <SidebarFooter buttons={buttons} />;
    }

    return null;
}
