import { SquareCoordinate } from '../../Data/Common/Coordinates';
import { GameData, modelBuilder } from '../../Data/GameData/Model';
import { GameDataAction, movePieceActionCreator } from '../../Data/GameData/Actions';
import withClickMovement, { RequiredBoardProps } from '../../Components/Board/withClickMovement';

export default function addClickMovement<TBoardProps extends RequiredBoardProps>(
    Board: React.FC<TBoardProps>,
    gameData: GameData,
    gameDataDispatch: React.Dispatch<GameDataAction>): React.FC<TBoardProps> {

    const model = modelBuilder(gameData);

    if (gameData.gameStage !== 'moves' || !model.isPlayersTurn()) {
        return Board;
    }

    const moveblePositions = model
        .getPiecesFromPlayer(model.getPlayerId())
        .filter(piece => model.possibleDestinations(piece).length > 0)
        .map(piece => piece.position);

    const destinationsFrom = (coord: SquareCoordinate) => {
        const piece = model.getPieceFromPosition(coord);
        return piece !== undefined ? model.possibleDestinations(piece) : [];
    };

    const onMove = (from: SquareCoordinate, to: SquareCoordinate) => {
        const piece = model.getPieceFromPosition(from);
        if (piece === undefined) return;
        if (!model.canMoveTo(piece, to)) return;

        gameDataDispatch(movePieceActionCreator(piece, to));
    };

    const Component = withClickMovement(Board);
    return function(props: TBoardProps) {
        return <Component {...props}
                          moveblePositions={moveblePositions}
                          destinationsFrom={destinationsFrom}
                          onMove={onMove} />
    }
}
