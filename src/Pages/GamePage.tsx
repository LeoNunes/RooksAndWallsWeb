import RnWGame from "Controllers/RnWGame";
import { rnwConfig } from "RnWConfig";
import { Navigate, useParams } from "react-router";

export default function GamePage() {
    const { gameId } = useParams<{ gameId: string }>();

    const gameIdNumber = parseInt(gameId ?? "", 10);

    if (!gameId || Number.isNaN(gameIdNumber)) {
        return <Navigate to="/" replace />;
    }

    return (
        <RnWGame
            gameId={gameIdNumber}
            board={{ rows: rnwConfig.boardSize.rows, columns: rnwConfig.boardSize.columns }}
        />
    );
}
