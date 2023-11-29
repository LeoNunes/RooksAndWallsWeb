import {
    RnWManagerStateProvider,
    useRnWManagerDispatch,
    useRnWManagerState,
} from '../../Domain/RnWManager/RnWGameManagerStateProvider';
import RnWAccessGame from '../../Components/RnWAccessGame/RnWAccessGame';
import RnWGame from '../RnWGame';
import { rnwConfig } from '../../RnWConfig';
import { createGame } from '../../Domain/RnWManager/Actions';

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

    const game = rnwManagerState.games.at(0);

    if (game && !game.isCreating) {
        return (
            <RnWGame
                gameId={game.gameId}
                board={{ rows: rnwConfig.boardSize.rows, columns: rnwConfig.boardSize.columns }}
            />
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
            joinGame={() => {}}
        />
    );
}
