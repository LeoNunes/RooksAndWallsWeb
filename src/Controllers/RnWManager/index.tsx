import { createGame, joinGame } from 'Domain/RnWManager/Actions';
import {
    RnWManagerStateProvider,
    useRnWManagerDispatch,
    useRnWManagerState,
} from 'Domain/RnWManager/RnWGameManagerStateProvider';
import RnWGame from 'Controllers/RnWGame';
import RnWAccessGame from 'Components/RnWAccessGame/RnWAccessGame';
import { rnwConfig } from 'RnWConfig';

export default function RnWGameManager() {
    return (
        <RnWManagerStateProvider>
            <RnWGameManagerController />
        </RnWManagerStateProvider>
    );
}

type RnWGameManagerControllerProps = {};
function RnWGameManagerController(props: RnWGameManagerControllerProps) {
    const rnwManagerState = useRnWManagerState();
    const rnwManagerDispatch = useRnWManagerDispatch();

    function handleCreateGame(players: number, piecesPerPlayer: number): void {
        rnwManagerDispatch(createGame(players, piecesPerPlayer));
    }

    function handleJoinGame(gameId: number): void {
        rnwManagerDispatch(joinGame(gameId));
    }

    const game = rnwManagerState.games.at(0);

    if (game && !game.isCreating) {
        return (
            <>
                <p style={{ textAlign: 'center' }}>Game ID: {game.gameId}</p>
                <RnWGame
                    gameId={game.gameId}
                    board={{ rows: rnwConfig.boardSize.rows, columns: rnwConfig.boardSize.columns }}
                />
            </>
        );
    }

    return (
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
    );
}
