import WinnerOverlay, { type WinnerOverlayProps } from "Components/WinnerOverlay/WinnerOverlay";
import type { Stage } from "Domain/RnW/Model";
import type { PieceColor } from "RnWConfig";
import type { PropsWithChildren } from "react";
import "./GameFrame.css";

export type PlayerSlotProps = {
    color: PieceColor;
    iconUrl: string;
    displayName: string;
    isCurrentTurn: boolean;
    badge?: string;
    hasJoined: boolean;
    isEliminated: boolean;
    isWinner: boolean;
};

export type GameFrameProps = PropsWithChildren<{
    slots: PlayerSlotProps[];
    stage: Stage;
    winner: WinnerOverlayProps | undefined;
}>;

export default function GameFrame({ children, slots, stage, winner }: GameFrameProps) {
    return (
        <div className="game-frame">
            <div className="game-frame-board">
                {children}
                {winner && <WinnerOverlay {...winner} />}
            </div>
            <aside className="game-frame-sidebar">
                <h2 className="game-frame-sidebar-header">{sidebarHeader(stage)}</h2>
                {slots.map((slot) => (
                    <PlayerSlot key={slot.color} {...slot} />
                ))}
            </aside>
        </div>
    );
}

function sidebarHeader(stage: Stage): string {
    switch (stage) {
        case "waiting_for_players":
            return "Waiting for players";
        case "completed":
            return "Final Standings";
        default:
            return "Players";
    }
}

function PlayerSlot({ color, iconUrl, displayName, isCurrentTurn, badge, hasJoined, isEliminated }: PlayerSlotProps) {
    if (!hasJoined) {
        return (
            <div className="player-slot waiting">
                <div className="player-slot-spinner" />
                <span className="player-slot-waiting-text">Waiting\u2026</span>
            </div>
        );
    }

    const classes = ["player-slot", color, isCurrentTurn && "current-turn", isEliminated && "eliminated"]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
            <img className="player-slot-icon" src={iconUrl} alt={color} />
            <div className="player-slot-info">
                <span className="player-slot-name">{displayName}</span>
                {badge && <span className="player-slot-badge">{badge}</span>}
            </div>
        </div>
    );
}
