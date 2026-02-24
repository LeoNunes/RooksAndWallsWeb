import LoadingOverlay from "Components/LoadingOverlay/LoadingOverlay";
import RnWAccessGame from "Components/RnWAccessGame/RnWAccessGame";
import { createGame, joinGame } from "Domain/RnWManager/Actions";
import {
    RnWManagerStateProvider,
    useRnWManagerDispatch,
    useRnWManagerState,
} from "Domain/RnWManager/RnWGameManagerStateProvider";
import { rnwConfig } from "RnWConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function RnWGameManager() {
    return (
        <RnWManagerStateProvider>
            <RnWGameManagerController />
        </RnWManagerStateProvider>
    );
}

// biome-ignore lint/complexity/noBannedTypes: I need an empty object
type RnWGameManagerControllerProps = {};
function RnWGameManagerController(_props: RnWGameManagerControllerProps) {
    const rnwManagerState = useRnWManagerState();
    const rnwManagerDispatch = useRnWManagerDispatch();
    const navigate = useNavigate();

    const game = rnwManagerState.games.at(0);

    useEffect(() => {
        if (game && !game.isCreating) {
            navigate(`/game/rw/${game.gameId}`);
        }
    }, [game, navigate]);

    function handleCreateGame(players: number, piecesPerPlayer: number): void {
        rnwManagerDispatch(createGame(players, piecesPerPlayer));
    }

    function handleJoinGame(gameId: number): void {
        rnwManagerDispatch(joinGame(gameId));
    }

    return (
        <>
            <RnWAccessGame
                maxPlayers={rnwConfig.maxNumberOfPlayers}
                minPlayers={rnwConfig.minNumberOfPlayers}
                defaultPlayers={rnwConfig.defaultNumberOfPlayers}
                maxPiecesPerPlayer={rnwConfig.maxPiecesPerPlayer}
                minPiecesPerPlayer={rnwConfig.minPiecesPerPlayer}
                defaultPiecesPerPlayer={rnwConfig.defaultPiecesPerPlayer}
                createGame={handleCreateGame}
                joinGame={handleJoinGame}
            />
            {game?.isCreating && <LoadingOverlay />}
        </>
    );
}
