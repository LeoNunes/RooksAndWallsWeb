import RnWGame from "Controllers/RnWGame";
import { rnwConfig } from "RnWConfig";
import { Navigate, useParams } from "react-router";

export default function GamePage() {
    const { gameId } = useParams<{ gameId: string }>();

    if (gameId === undefined) {
        return <Navigate to="/" replace />;
    }

    return <RnWGame gameId={gameId} board={{ rows: rnwConfig.boardSize.rows, columns: rnwConfig.boardSize.columns }} />;
}
