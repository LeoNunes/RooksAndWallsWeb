import "./PlayerSlot.css";

export default function WaitingForPlayerSlot() {
    return (
        <div className="player-slot waiting">
            <div className="player-slot-spinner" />
            <span className="player-slot-waiting-text">Waiting...</span>
        </div>
    );
}
