import withHighlight, { type BoardProps, type ComputedBoardProps } from "Components/Board/withHighlight";
import {
    areEdgeCoordinatesEqual,
    areSquareCoordinatesEqual,
    type EdgeCoordinate,
    type SquareCoordinate,
} from "Domain/Common/Coordinates";
import type { RnWModel } from "Domain/RnW/Model";
import { type ComponentType, useCallback, useMemo, useRef } from "react";

type CombinedBoardProps = BoardProps<EdgeCoordinate, "createEdgeContent"> &
    BoardProps<SquareCoordinate, "createSquareContent">;
type CombinedComputedBoardProps<TBoardProps> = ComputedBoardProps<EdgeCoordinate, TBoardProps> &
    ComputedBoardProps<SquareCoordinate, TBoardProps>;

export default function useLastMoveHighlight<TBoardProps extends CombinedBoardProps>(
    Board: ComponentType<CombinedComputedBoardProps<TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<CombinedComputedBoardProps<TBoardProps>> {
    return useEdgeLastMoveHighlight(useSquareLastMoveHighlight(Board, getRnWModel), getRnWModel);
}

function useSquareLastMoveHighlight<TBoardProps extends BoardProps<SquareCoordinate, "createSquareContent">>(
    Board: ComponentType<ComputedBoardProps<SquareCoordinate, TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<ComputedBoardProps<SquareCoordinate, TBoardProps>> {
    const Component = useMemo(
        () => withHighlight<SquareCoordinate, "createSquareContent", TBoardProps>(Board, "createSquareContent"),
        [Board],
    );

    return useCallback(
        function AddSquareLastMoveHighlight(props: ComputedBoardProps<SquareCoordinate, TBoardProps>) {
            const rnwModel = getRnWModel();
            // TODO: Fix this
            // biome-ignore lint/correctness/useHookAtTopLevel: TODO
            const lastStatePieces = useRef(rnwModel.pieces);
            // TODO: Fix this
            // biome-ignore lint/correctness/useHookAtTopLevel: TODO
            const lastMovement = useRef<SquareCoordinate[]>([]);

            // TODO: add moves history on the backend and get data here
            for (const piece of lastStatePieces.current) {
                const oldPosition = piece.position;
                const newPosition =
                    rnwModel.pieces.find((p) => p.id === piece.id)?.position ||
                    rnwModel.deadPieces.find((p) => p.id === piece.id)?.position;
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

function useEdgeLastMoveHighlight<TBoardProps extends BoardProps<EdgeCoordinate, "createEdgeContent">>(
    Board: ComponentType<ComputedBoardProps<EdgeCoordinate, TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {
    const Component = useMemo(
        () => withHighlight<EdgeCoordinate, "createEdgeContent", TBoardProps>(Board, "createEdgeContent"),
        [Board],
    );

    return useCallback(
        function AddEdgeLastMoveHighlight(props: ComputedBoardProps<EdgeCoordinate, TBoardProps>) {
            const rnwModel = getRnWModel();
            // TODO: Fix this
            // biome-ignore lint/correctness/useHookAtTopLevel: TODO
            const lastStateWalls = useRef(rnwModel.walls);
            // TODO: Fix this
            // biome-ignore lint/correctness/useHookAtTopLevel: TODO
            const lastWallPosition = useRef<EdgeCoordinate[]>([]);

            // TODO: add moves history on the backend and get data here
            for (const wall of rnwModel.walls) {
                if (!lastStateWalls.current.find((w) => areEdgeCoordinatesEqual(w.position, wall.position))) {
                    lastWallPosition.current = [wall.position];
                }
            }
            lastStateWalls.current = rnwModel.walls;

            return <Component {...props} highlighted={lastWallPosition.current} />;
        },
        [Component, getRnWModel],
    );
}
