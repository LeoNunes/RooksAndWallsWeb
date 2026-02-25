import GameFrame, { type PlayerSlotProps } from "Components/GameFrame/GameFrame";
import type { WinnerOverlayProps } from "Components/WinnerOverlay/WinnerOverlay";
import { type GameResult, gameResult, type RnWState } from "Domain/RnW/Model";
import { useRnWState } from "Domain/RnW/RnWStateProvider";
import { rnwConfig } from "RnWConfig";
import type { PropsWithChildren } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function RnWFrameController({ children }: PropsWithChildren) {
    const state = useRnWState();
    const [overlayDismissed, setOverlayDismissed] = useState(false);

    useEffect(() => {
        if (state.stage !== "completed") {
            setOverlayDismissed(false);
        }
    }, [state.stage]);

    const result = useMemo(() => gameResult(state), [state]);
    const slots = useMemo(() => deriveSlots(state, result), [state, result]);

    const onDismiss = useCallback(() => setOverlayDismissed(true), []);
    const winner = useMemo(
        () => deriveWinner(state, result, onDismiss, overlayDismissed),
        [state, result, onDismiss, overlayDismissed],
    );

    return (
        <GameFrame slots={slots} stage={state.stage} winner={winner}>
            {children}
        </GameFrame>
    );
}

function deriveSlots(state: RnWState, result: GameResult): PlayerSlotProps[] {
    const slots: PlayerSlotProps[] = [];
    const winnerIds = result.type === "winners" ? result.playerIds : [];

    for (let i = 0; i < state.numberOfPlayers; i++) {
        const playerConfig = rnwConfig.players[i];
        const color = playerConfig.color;
        const hasJoined = state.players.some((p) => p.id === i);
        const isLocal = i === state.playerId;
        const isCurrentTurn = state.currentPlayer === i;
        const isWinner = winnerIds.includes(i);

        let badge: string | undefined;
        if (result.type !== "in_progress" && isWinner) {
            badge = "Winner!";
        } else if (isCurrentTurn && isLocal) {
            badge = "Your turn";
        } else if (isCurrentTurn) {
            badge = "Playing";
        }

        slots.push({
            color,
            iconUrl: rnwConfig.pieces[color].default.uri,
            displayName: isLocal ? "You" : color.charAt(0).toUpperCase() + color.slice(1),
            isCurrentTurn,
            badge,
            hasJoined,
            isEliminated: result.type === "draw" || (result.type === "winners" && hasJoined && !isWinner),
            isWinner,
        });
    }

    return slots;
}

function deriveWinner(
    state: RnWState,
    result: GameResult,
    onDismiss: () => void,
    overlayDismissed: boolean,
): WinnerOverlayProps | undefined {
    if (result.type === "in_progress") return undefined;

    if (result.type === "draw") {
        return { visible: !overlayDismissed, outcome: "draw", onDismiss };
    }

    const localWins = result.playerIds.includes(state.playerId);
    if (localWins) {
        return { visible: !overlayDismissed, outcome: "local_wins", onDismiss };
    }

    const winnerColor = rnwConfig.players[result.playerIds[0]].color;
    const winnerName = winnerColor.charAt(0).toUpperCase() + winnerColor.slice(1);
    return { visible: !overlayDismissed, outcome: "other_wins", winnerName, onDismiss };
}
