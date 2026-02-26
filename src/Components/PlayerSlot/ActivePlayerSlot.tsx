import type { PieceColor } from "RnWConfig";
import "./PlayerSlot.css";

export type ActivePlayerSlotProps = {
    color: PieceColor;
    iconUrl: string;
    displayName: string;
    isCurrentTurn: boolean;
    badge?: string;
};

export default function ActivePlayerSlot({ color, iconUrl, displayName, isCurrentTurn, badge }: ActivePlayerSlotProps) {
    const classes = ["player-slot", color, isCurrentTurn && "current-turn"].filter(Boolean).join(" ");

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
