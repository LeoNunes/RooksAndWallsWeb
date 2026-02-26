import type { PieceColor } from "RnWConfig";
import "./PlayerSlot.css";

export type LobbyPlayerSlotProps = {
    color: PieceColor;
    iconUrl: string;
    displayName: string;
};

export default function LobbyPlayerSlot({ color, iconUrl, displayName }: LobbyPlayerSlotProps) {
    return (
        <div className={`player-slot ${color}`}>
            <img className="player-slot-icon" src={iconUrl} alt={color} />
            <div className="player-slot-info">
                <span className="player-slot-name">{displayName}</span>
                <span className="player-slot-badge">Joined</span>
                <div className={`player-slot-color-bar ${color}`} />
            </div>
        </div>
    );
}
