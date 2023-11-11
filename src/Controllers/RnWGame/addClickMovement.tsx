import { SquareCoordinate } from '../../Domain/Common/Coordinates';
import { RnWModel } from '../../Domain/RnW/Model';
import { RnWActions } from '../../Domain/RnW/Actions';
import withClickMovement, {
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withClickMovement';

export default function addClickMovement<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    rnwModel: RnWModel,
    rnwActions: RnWActions,
): React.FC<ComputedBoardProps<TBoardProps>> {
    if (rnwModel.playerCurrentAction() !== 'move_piece') return Board;

    const moveblePositions = rnwModel
        .getPiecesFromPlayer(rnwModel.getPlayerId())
        .filter(piece => rnwModel.possibleDestinations(piece).length > 0)
        .map(piece => piece.position);

    const destinationsFrom = (coord: SquareCoordinate) => {
        const piece = rnwModel.getPieceFromPosition(coord);
        return piece !== undefined ? rnwModel.possibleDestinations(piece) : [];
    };

    const onMove = (from: SquareCoordinate, to: SquareCoordinate) => {
        const piece = rnwModel.getPieceFromPosition(from);
        if (piece === undefined) return;
        if (!rnwModel.canMoveTo(piece, to)) return;

        rnwActions.setNextMovePiece(piece, to);
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
