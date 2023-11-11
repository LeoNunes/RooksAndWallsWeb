import React from 'react';
import withHighlight, {
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withHighlight';
import {
    EdgeCoordinate,
    SquareCoordinate,
    areEdgeCoordinatesEqual,
    areSquareCoordinatesEqual,
} from '../../Domain/Common/Coordinates';
import { Piece, RnWModel, Wall } from '../../Domain/RnW/Model';

type CombinedBoardProps = BoardProps<EdgeCoordinate, 'createEdgeContent'> &
    BoardProps<SquareCoordinate, 'createSquareContent'>;
type CombinedComputedBoardProps<TBoardProps> = ComputedBoardProps<EdgeCoordinate, TBoardProps> &
    ComputedBoardProps<SquareCoordinate, TBoardProps>;

export default function addLastMoveHighlight<TBoardProps extends CombinedBoardProps>(
    Board: React.FC<CombinedComputedBoardProps<TBoardProps>>,
    rnwModel: RnWModel,
): React.FC<CombinedComputedBoardProps<TBoardProps>> {
    return addEdgeLastMoveHighlight(addSquareLastMoveHighlight(Board, rnwModel), rnwModel);
}

let lastStatePieces: Piece[] = [];
let lastMovement: SquareCoordinate[] = [];
function addSquareLastMoveHighlight<
    TBoardProps extends BoardProps<SquareCoordinate, 'createSquareContent'>,
>(
    Board: React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>>,
    rnwModel: RnWModel,
): React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>> {
    const Component = withHighlight<SquareCoordinate, 'createSquareContent', TBoardProps>(
        Board,
        'createSquareContent',
    );

    return function AddSquareLastMoveHighlight(
        props: ComputedBoardProps<SquareCoordinate, TBoardProps>,
    ) {
        // TODO: add moves history on the backend and get data here
        // This is a workaround as the component is being recreated and can't have a persistent state
        for (const piece of rnwModel.pieces) {
            const newPosition = piece.position;
            const oldPosition = lastStatePieces.find(p => p.id === piece.id)?.position;
            if (oldPosition && !areSquareCoordinatesEqual(oldPosition, newPosition)) {
                lastMovement = [oldPosition, newPosition];
            }
        }
        lastStatePieces = rnwModel.pieces;

        return <Component {...props} highlighted={lastMovement} />;
    };
}

let lastStateWalls: Wall[] = [];
let lastWallPosition: EdgeCoordinate[] = [];
function addEdgeLastMoveHighlight<
    TBoardProps extends BoardProps<EdgeCoordinate, 'createEdgeContent'>,
>(
    Board: React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>>,
    rnwModel: RnWModel,
): React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {
    const Component = withHighlight<EdgeCoordinate, 'createEdgeContent', TBoardProps>(
        Board,
        'createEdgeContent',
    );
    return function AddEdgeLastMoveHighlight(
        props: ComputedBoardProps<EdgeCoordinate, TBoardProps>,
    ) {
        // TODO: add moves history on the backend and get data here
        // This is a workaround as the component is being recreated and can't have a persistent state
        for (const wall of rnwModel.walls) {
            if (!lastStateWalls.find(w => areEdgeCoordinatesEqual(w.position, wall.position))) {
                lastWallPosition = [wall.position];
            }
        }
        lastStateWalls = rnwModel.walls;

        return <Component {...props} highlighted={lastWallPosition} />;
    };
}
