import { range } from "Util";
import { type ChangeEvent, type FormEvent, useState } from "react";
import "./RnWAccessGame.css";

type RnWAccessGameProps = {
    minPlayers: number;
    maxPlayers: number;
    defaultPlayers: number;
    minPiecesPerPlayer: number;
    maxPiecesPerPlayer: number;
    defaultPiecesPerPlayer: number;
    createGame: (players: number, piecesPerPlayer: number) => void;
    joinGame: (gameId: string) => void;
};

export default function RnWAccessGame(props: RnWAccessGameProps) {
    const [state, setState] = useState({
        players: props.defaultPlayers,
        piecesPerPlayer: props.defaultPiecesPerPlayer,
        gameId: undefined as string | undefined,
    });

    function handlePlayersChange(event: ChangeEvent<HTMLSelectElement>): void {
        let players = Number.parseInt(event.target.value, 10);
        players = Math.min(props.maxPlayers, players);
        players = Math.max(props.minPlayers, players);
        setState((s) => ({ ...s, players }));
    }

    function handlePiecesPerPlayerChange(event: ChangeEvent<HTMLSelectElement>): void {
        let piecesPerPlayer = Number.parseInt(event.target.value, 10);
        piecesPerPlayer = Math.min(props.maxPiecesPerPlayer, piecesPerPlayer);
        piecesPerPlayer = Math.max(props.minPiecesPerPlayer, piecesPerPlayer);
        setState((s) => ({ ...s, piecesPerPlayer }));
    }

    function handleGameIdChange(event: ChangeEvent<HTMLInputElement>): void {
        const s = event.target.value;
        setState((prev) => ({ ...prev, gameId: s || undefined }));
    }

    function handleCreateGameSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        props.createGame(state.players, state.piecesPerPlayer);
    }

    function handleJoinGameSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        props.joinGame(state.gameId || "");
    }

    return (
        <div className="access-game">
            <div className="access-game__hero">
                <h1 className="access-game__title">Rooks &amp; Walls</h1>
                <p className="access-game__tagline">Move your rooks. Place walls. Trap your opponents.</p>
            </div>

            <div className="access-game__actions">
                <div className="access-game__card">
                    <form className="create-new-game" onSubmit={handleCreateGameSubmit}>
                        <h2 className="access-game__card-title">New Game</h2>
                        <label className="access-game__field">
                            <span className="access-game__label">Players</span>
                            <select value={state.players} onChange={handlePlayersChange}>
                                {range(props.minPlayers, props.maxPlayers).map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="access-game__field">
                            <span className="access-game__label">Pieces per player</span>
                            <select value={state.piecesPerPlayer} onChange={handlePiecesPerPlayerChange}>
                                {range(props.minPiecesPerPlayer, props.maxPiecesPerPlayer).map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="submit" className="access-game__btn access-game__btn--primary">
                            Create Game
                        </button>
                    </form>
                </div>

                <div className="access-game__divider">
                    <span>or</span>
                </div>

                <div className="access-game__card">
                    <form className="join-existing-game" onSubmit={handleJoinGameSubmit}>
                        <h2 className="access-game__card-title">Join Game</h2>
                        <label className="access-game__field">
                            <span className="access-game__label">Game ID</span>
                            <input
                                type="text"
                                placeholder="Enter game ID"
                                value={state.gameId === undefined ? "" : state.gameId}
                                onChange={handleGameIdChange}
                            />
                        </label>
                        <button
                            type="submit"
                            className="access-game__btn access-game__btn--secondary"
                            disabled={state.gameId === undefined}
                        >
                            Join Game
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
