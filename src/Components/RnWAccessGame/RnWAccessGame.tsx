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

        setState((state) => ({ ...state, players }));
    }

    function handlePiecesPerPlayerChange(event: ChangeEvent<HTMLSelectElement>): void {
        let piecesPerPlayer = Number.parseInt(event.target.value, 10);
        piecesPerPlayer = Math.min(props.maxPiecesPerPlayer, piecesPerPlayer);
        piecesPerPlayer = Math.max(props.minPiecesPerPlayer, piecesPerPlayer);

        setState((state) => ({ ...state, piecesPerPlayer }));
    }

    function handleGameIdChange(event: ChangeEvent<HTMLInputElement>): void {
        const s = event.target.value;

        setState((state) => ({ ...state, gameId: s }));
    }

    function handleCreateGameSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        props.createGame(state.players, state.piecesPerPlayer);
    }

    function handleJoinGameSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (state.gameId === undefined) {
            return;
        }

        props.joinGame(state.gameId);
    }

    return (
        <div className="access-game">
            <form className="create-new-game" onSubmit={handleCreateGameSubmit}>
                <h3>Criar novo jogo</h3>
                <label>
                    Jogadores
                    <select value={state.players} onChange={handlePlayersChange}>
                        {range(props.minPlayers, props.maxPlayers).map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Peças por jogador
                    <select value={state.piecesPerPlayer} onChange={handlePiecesPerPlayerChange}>
                        {range(props.minPiecesPerPlayer, props.maxPiecesPerPlayer).map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </label>
                <input type="submit" value="Criar" />
            </form>
            <hr />
            <form className="join-existing-game" onSubmit={handleJoinGameSubmit}>
                <h3>Entrar em um jogo</h3>
                <label>
                    ID
                    <input
                        type="number"
                        value={state.gameId === undefined ? "" : state.gameId}
                        onChange={handleGameIdChange}
                    />
                </label>
                <input type="submit" value="Entrar" disabled={state.gameId === undefined} />
            </form>
        </div>
    );
}
