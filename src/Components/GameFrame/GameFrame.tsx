import WinnerOverlay, { type WinnerOverlayProps } from "Components/WinnerOverlay/WinnerOverlay";
import type { PropsWithChildren, ReactNode } from "react";
import "./GameFrame.css";

export type GameFrameProps = PropsWithChildren<{
    sidebarHeader: string;
    playerSlots: ReactNode[];
    winner: WinnerOverlayProps | undefined;
}>;

export default function GameFrame({ children, sidebarHeader, playerSlots, winner }: GameFrameProps) {
    return (
        <div className="game-frame">
            <div className="game-frame-board">
                {children}
                {winner && <WinnerOverlay {...winner} />}
            </div>
            <aside className="game-frame-sidebar">
                <h2 className="game-frame-sidebar-header">{sidebarHeader}</h2>
                {playerSlots}
            </aside>
        </div>
    );
}
