import ActivePlayerSlot from "Components/PlayerSlot/ActivePlayerSlot";
import GameResultPlayerSlot from "Components/PlayerSlot/GameResultPlayerSlot";
import LobbyPlayerSlot from "Components/PlayerSlot/LobbyPlayerSlot";
import WaitingForPlayerSlot from "Components/PlayerSlot/WaitingForPlayerSlot";
import { gameResult, isPlayerEliminated } from "Domain/RnW/Model";
import { useRnWState } from "Domain/RnW/RnWStateProvider";
import { rnwConfig } from "RnWConfig";
import { useMemo } from "react";

export type RnWPlayerSlotControllerProps = {
    playerId: number;
};

export default function RnWPlayerSlotController({ playerId }: RnWPlayerSlotControllerProps) {
    const state = useRnWState();
    const result = useMemo(() => gameResult(state), [state]);
    const hasPlayerInSlot = state.players.some((player) => player.id === playerId);
    const playerEliminated = isPlayerEliminated(state, playerId);

    const playerConfig = rnwConfig.players[playerId];
    const color = playerConfig.color;
    const iconUrl = rnwConfig.pieces[color].default.uri;
    const isLocal = playerId === state.playerId;
    const colorLabel = color.charAt(0).toUpperCase() + color.slice(1);

    if (state.stage === "waiting_for_players") {
        if (!hasPlayerInSlot) return <WaitingForPlayerSlot />;
        return <LobbyPlayerSlot color={color} iconUrl={iconUrl} displayName={isLocal ? "You" : colorLabel} />;
    }

    if (state.stage === "completed") {
        const isWinner = result.type === "winners" && result.playerIds.includes(playerId);
        const displayName = isLocal && isWinner ? "You \u2013 Winner!" : isLocal ? "You" : `${colorLabel} Player`;
        const badge = isWinner ? "Winner!" : "Eliminated";

        return (
            <GameResultPlayerSlot
                color={color}
                iconUrl={iconUrl}
                displayName={displayName}
                isWinner={isWinner}
                badge={badge}
            />
        );
    }

    if (playerEliminated) {
        return (
            <GameResultPlayerSlot
                color={color}
                iconUrl={iconUrl}
                displayName={isLocal ? "You" : colorLabel}
                isWinner={false}
                badge="Eliminated"
            />
        );
    }

    const isCurrentTurn = state.currentPlayer === playerId;
    const displayName = isLocal ? "You" : colorLabel;
    let badge: string | undefined;
    if (isCurrentTurn && isLocal) {
        badge = "Your turn";
    } else if (isCurrentTurn) {
        badge = "Playing";
    }

    return (
        <ActivePlayerSlot
            color={color}
            iconUrl={iconUrl}
            displayName={displayName}
            isCurrentTurn={isCurrentTurn}
            badge={badge}
        />
    );
}
