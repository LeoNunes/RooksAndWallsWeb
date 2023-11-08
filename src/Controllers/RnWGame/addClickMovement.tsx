import { SquareCoordinate } from '../../Data/Common/Coordinates';
import { AsyncDispatch } from '../../Data/Common/DataTypes';
import { RnWState, modelBuilder } from '../../Data/RnW/Model';
import { RnWAction, movePieceActionCreator } from '../../Data/RnW/Actions';
import withClickMovement, {
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withClickMovement';

export default function addClickMovement<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    rnwState: RnWState,
    rnwDispatch: AsyncDispatch<RnWAction>,
): React.FC<ComputedBoardProps<TBoardProps>> {
    const model = modelBuilder(rnwState);

    if (rnwState.stage !== 'moves' || !model.isPlayersTurn()) {
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

        rnwDispatch(movePieceActionCreator(piece, to));
    };

    const Component = withClickMovement(Board);
    return function AddClickMovement(props: ComputedBoardProps<TBoardProps>) {
        return (
            <Component
                {...props}
                moveblePositions={moveblePositions}
                destinationsFrom={destinationsFrom}
                onMove={onMove}
            />
        );
    };
}
