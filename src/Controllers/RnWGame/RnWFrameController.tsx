import GameFrame from "Components/GameFrame/GameFrame";
import type { WinnerOverlayProps } from "Components/WinnerOverlay/WinnerOverlay";
import { type GameResult, gameResult, type RnWState, type Stage } from "Domain/RnW/Model";
import { useRnWState } from "Domain/RnW/RnWStateProvider";
import { rnwConfig } from "RnWConfig";
import type { PropsWithChildren, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import RnWPlayerSlotController from "./RnWPlayerSlotController";
import RnWSidebarFooterController from "./RnWSidebarFooterController";

export default function RnWFrameController({ children }: PropsWithChildren) {
    const state = useRnWState();
    const [overlayDismissed, setOverlayDismissed] = useState(false);

    useEffect(() => {
        if (state.stage !== "completed") {
            setOverlayDismissed(false);
        }
    }, [state.stage]);

    const result = useMemo(() => gameResult(state), [state]);
    const sidebarHeader = useMemo(() => deriveSidebarHeader(state.stage), [state.stage]);
    const playerSlots = useMemo<ReactNode[]>(
        () =>
            Array.from({ length: state.numberOfPlayers }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: The order of the players never changes
                <RnWPlayerSlotController key={`player-slot-${i}`} player={state.players[i]} />
            )),
        [state.numberOfPlayers, state.players],
    );

    const onDismiss = useCallback(() => setOverlayDismissed(true), []);
    const winner = useMemo(
        () => deriveWinner(state, result, onDismiss, overlayDismissed),
        [state, result, onDismiss, overlayDismissed],
    );

    return (
        <GameFrame
            sidebarHeader={sidebarHeader}
            playerSlots={playerSlots}
            sidebarFooter={<RnWSidebarFooterController />}
            winner={winner}
        >
            {children}
        </GameFrame>
    );
}

function deriveSidebarHeader(stage: Stage): string {
    switch (stage) {
        case "waiting_for_players":
            return "Lobby";
        case "completed":
            return "Player Standings";
        default:
            return "Players";
    }
}

function deriveWinner(
    state: RnWState,
    result: GameResult,
    onDismiss: () => void,
    overlayDismissed: boolean,
): WinnerOverlayProps | undefined {
    if (result.type === "in_progress") return undefined;

    if (result.type === "draw") {
        return { visible: !overlayDismissed, outcome: "draw", subtitle: "No one wins!", onDismiss };
    }

    const winnerColor = rnwConfig.players[result.player.number].color;
    const winnerName = winnerColor.charAt(0).toUpperCase() + winnerColor.slice(1);
    const subtitle = `${winnerName} wins the game!`;
    const localWins = result.player.id === state.localPlayer.id;

    if (localWins) {
        return { visible: !overlayDismissed, outcome: "local_wins", subtitle, onDismiss };
    }

    return { visible: !overlayDismissed, outcome: "other_wins", winnerName, subtitle, onDismiss };
}
