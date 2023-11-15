import { ComponentType, useCallback, useMemo, useRef } from 'react';
import { RnWModel } from '../../Domain/RnW/Model';
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

type CombinedBoardProps = BoardProps<EdgeCoordinate, 'createEdgeContent'> &
    BoardProps<SquareCoordinate, 'createSquareContent'>;
type CombinedComputedBoardProps<TBoardProps> = ComputedBoardProps<EdgeCoordinate, TBoardProps> &
    ComputedBoardProps<SquareCoordinate, TBoardProps>;

export default function useLastMoveHighlight<TBoardProps extends CombinedBoardProps>(
    Board: ComponentType<CombinedComputedBoardProps<TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<CombinedComputedBoardProps<TBoardProps>> {
    return useEdgeLastMoveHighlight(useSquareLastMoveHighlight(Board, getRnWModel), getRnWModel);
}

function useSquareLastMoveHighlight<
    TBoardProps extends BoardProps<SquareCoordinate, 'createSquareContent'>,
>(
    Board: ComponentType<ComputedBoardProps<SquareCoordinate, TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<ComputedBoardProps<SquareCoordinate, TBoardProps>> {
    const Component = useMemo(
        () =>
            withHighlight<SquareCoordinate, 'createSquareContent', TBoardProps>(
                Board,
                'createSquareContent',
            ),
        [Board],
    );

    return useCallback(
        function AddSquareLastMoveHighlight(
            props: ComputedBoardProps<SquareCoordinate, TBoardProps>,
        ) {
            const rnwModel = getRnWModel();
            const lastStatePieces = useRef(rnwModel.pieces);
            const lastMovement = useRef<SquareCoordinate[]>([]);

            // TODO: add moves history on the backend and get data here
            for (const piece of lastStatePieces.current) {
                const oldPosition = piece.position;
                const newPosition =
                    rnwModel.pieces.find(p => p.id === piece.id)?.position ||
                    rnwModel.deadPieces.find(p => p.id === piece.id)?.position;
                if (newPosition && !areSquareCoordinatesEqual(oldPosition, newPosition)) {
                    lastMovement.current = [oldPosition, newPosition];
                }
            }
            lastStatePieces.current = rnwModel.pieces;

            return <Component {...props} highlighted={lastMovement.current} />;
        },
        [Component, getRnWModel],
    );
}

function useEdgeLastMoveHighlight<
    TBoardProps extends BoardProps<EdgeCoordinate, 'createEdgeContent'>,
>(
    Board: ComponentType<ComputedBoardProps<EdgeCoordinate, TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {
    const Component = useMemo(
        () =>
            withHighlight<EdgeCoordinate, 'createEdgeContent', TBoardProps>(
                Board,
                'createEdgeContent',
            ),
        [Board],
    );

    return useCallback(
        function AddEdgeLastMoveHighlight(props: ComputedBoardProps<EdgeCoordinate, TBoardProps>) {
            const rnwModel = getRnWModel();
            let lastStateWalls = useRef(rnwModel.walls);
            let lastWallPosition = useRef<EdgeCoordinate[]>([]);

            // TODO: add moves history on the backend and get data here
            for (const wall of rnwModel.walls) {
                if (
                    !lastStateWalls.current.find(w =>
                        areEdgeCoordinatesEqual(w.position, wall.position),
                    )
                ) {
                    lastWallPosition.current = [wall.position];
                }
            }
            lastStateWalls.current = rnwModel.walls;

            return <Component {...props} highlighted={lastWallPosition.current} />;
        },
        [Component, getRnWModel],
    );
}
