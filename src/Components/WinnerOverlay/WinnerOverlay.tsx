import "./WinnerOverlay.css";

export type WinnerOverlayProps = {
    visible: boolean;
    outcome: "local_wins" | "other_wins" | "draw";
    winnerName?: string;
    subtitle?: string;
    onDismiss: () => void;
};

export default function WinnerOverlay({ visible, outcome, winnerName, subtitle, onDismiss }: WinnerOverlayProps) {
    if (!visible) return null;

    const isLocalWin = outcome === "local_wins";
    const title =
        outcome === "local_wins" ? "YOU WIN!" : outcome === "other_wins" ? `${winnerName} wins!` : "It's a draw!";

    return (
        <div className="winner-overlay">
            <div className="winner-overlay-card">
                {outcome !== "draw" && <span className="winner-overlay-trophy">{"\u2728\n\uD83C\uDFC6"}</span>}
                <h2 className={`winner-overlay-title${isLocalWin ? " gold" : ""}`}>{title}</h2>
                {subtitle && <p className="winner-overlay-subtitle">{subtitle}</p>}
                <button type="button" className="winner-overlay-dismiss" onClick={onDismiss}>
                    Dismiss
                </button>
            </div>
        </div>
    );
}
