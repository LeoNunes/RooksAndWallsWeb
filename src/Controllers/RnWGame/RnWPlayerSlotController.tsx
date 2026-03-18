import ActivePlayerSlot from "Components/PlayerSlot/ActivePlayerSlot";
import GameResultPlayerSlot from "Components/PlayerSlot/GameResultPlayerSlot";
import LobbyPlayerSlot from "Components/PlayerSlot/LobbyPlayerSlot";
import WaitingForPlayerSlot from "Components/PlayerSlot/WaitingForPlayerSlot";
import { currentMoveType, gameResult, isPlayerEliminated, type Player } from "Domain/RnW/Model";
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

    const playerEliminated = isPlayerEliminated(state, player.number);

    const playerNumber = player.number;
    const color = rnwConfig.players[playerNumber].color;
    const iconUrl = rnwAssets.pieces[color].default.uri;
    const isLocal = player.id === state.localPlayer.id;
    const nameLabel = isLocal ? "You" : player.displayName;

    if (state.stage === "not_started") {
        return <LobbyPlayerSlot color={color} iconUrl={iconUrl} displayName={nameLabel} />;
    }

    if (state.stage === "completed") {
        const isWinner = result.type === "winner" && result.playerNumber === player.number;
        const displayName =
            isLocal && isWinner ? "You \u2013 Winner!" : isWinner ? `${player.displayName} \u2013 Winner!` : nameLabel;
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
                displayName={nameLabel}
                isWinner={false}
                badge="Eliminated"
            />
        );
    }

    const isCurrentTurn = state.currentPlayer === player.number;
    const displayName = nameLabel;
    const moveType = isCurrentTurn && isLocal ? currentMoveType(state) : undefined;
    let badge: string | undefined;
    if (isCurrentTurn && isLocal) {
        badge = moveType === "wall_only" ? "Place a wall" : "Your turn";
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
