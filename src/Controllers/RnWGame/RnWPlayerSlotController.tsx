import ActivePlayerSlot from "Components/PlayerSlot/ActivePlayerSlot";
import GameResultPlayerSlot from "Components/PlayerSlot/GameResultPlayerSlot";
import LobbyPlayerSlot from "Components/PlayerSlot/LobbyPlayerSlot";
import WaitingForPlayerSlot from "Components/PlayerSlot/WaitingForPlayerSlot";
import { gameResult, isPlayerEliminated, type Player } from "Domain/RnW/Model";
import { useRnWState } from "Domain/RnW/RnWStateProvider";
import { rnwAssets } from "RnWAssets";
import { rnwConfig } from "RnWConfig";
import { useMemo } from "react";

export type RnWPlayerSlotControllerProps = {
    player: Player | undefined;
};

export default function RnWPlayerSlotController({ player }: RnWPlayerSlotControllerProps) {
    const state = useRnWState();
    const result = useMemo(() => gameResult(state), [state]);

    if (player === undefined) return <WaitingForPlayerSlot />;

    const playerEliminated = isPlayerEliminated(state, player);

    const playerNumber = player.number;
    const color = rnwConfig.players[playerNumber].color;
    const iconUrl = rnwAssets.pieces[color].default.uri;
    const isLocal = player.id === state.localPlayer.id;
    const colorLabel = color.charAt(0).toUpperCase() + color.slice(1);

    if (state.stage === "waiting_for_players") {
        return <LobbyPlayerSlot color={color} iconUrl={iconUrl} displayName={isLocal ? "You" : colorLabel} />;
    }

    if (state.stage === "completed") {
        const isWinner = result.type === "winner" && result.player.id === player.id;
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

    const isCurrentTurn = state.currentPlayer?.id === player.id;
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
