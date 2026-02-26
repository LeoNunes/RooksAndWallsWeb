import ActivePlayerSlot from "Components/PlayerSlot/ActivePlayerSlot";
import GameResultPlayerSlot from "Components/PlayerSlot/GameResultPlayerSlot";
import WaitingForPlayerSlot from "Components/PlayerSlot/WaitingForPlayerSlot";
import { gameResult } from "Domain/RnW/Model";
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

    if (state.stage === "waiting_for_players" && !hasPlayerInSlot) {
        return <WaitingForPlayerSlot />;
    }

    const playerConfig = rnwConfig.players[playerId];
    const color = playerConfig.color;
    const iconUrl = rnwConfig.pieces[color].default.uri;
    const isLocal = playerId === state.playerId;
    const isCurrentTurn = state.currentPlayer === playerId;
    const displayName = isLocal ? "You" : color.charAt(0).toUpperCase() + color.slice(1);
    const isWinner = result.type === "winners" && result.playerIds.includes(playerId);

    let badge: string | undefined;
    if (result.type !== "in_progress" && isWinner) {
        badge = "Winner!";
    } else if (isCurrentTurn && isLocal) {
        badge = "Your turn";
    } else if (isCurrentTurn) {
        badge = "Playing";
    }

    if (state.stage === "completed") {
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
