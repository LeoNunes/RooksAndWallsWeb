import type { PieceColor } from "RnWConfig";
import "./PlayerSlot.css";

export type GameResultPlayerSlotProps = {
    color: PieceColor;
    iconUrl: string;
    displayName: string;
    isWinner: boolean;
    badge?: string;
};

export default function GameResultPlayerSlot({
    color,
    iconUrl,
    displayName,
    isWinner,
    badge,
}: GameResultPlayerSlotProps) {
    const classes = ["player-slot", color, !isWinner && "eliminated"].filter(Boolean).join(" ");

    return (
        <div className={classes}>
            {isWinner ? (
                <span className="player-slot-rank-icon">{"\uD83C\uDFC6"}</span>
            ) : (
                <img className="player-slot-icon" src={iconUrl} alt={color} />
            )}
            <div className="player-slot-info">
                <span className="player-slot-name">{displayName}</span>
                {badge && <span className="player-slot-badge">{badge}</span>}
                {isWinner && <div className="player-slot-color-bar gold" />}
            </div>
        </div>
    );
}
