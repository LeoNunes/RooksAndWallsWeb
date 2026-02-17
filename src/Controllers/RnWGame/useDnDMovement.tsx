import withDnDMovement, { type BoardProps, type ComputedBoardProps } from "Components/Board/withDnDMovement";
import type { SquareCoordinate } from "Domain/Common/Coordinates";
import type { RnWActions } from "Domain/RnW/Actions";
import type { RnWModel } from "Domain/RnW/Model";
import { type ComponentType, useCallback, useMemo } from "react";

export default function useDnDMovement<TBoardProps extends BoardProps>(
    Board: ComponentType<ComputedBoardProps<TBoardProps>>,
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
): ComponentType<ComputedBoardProps<TBoardProps>> {
    const Component = useMemo(() => withDnDMovement(Board), [Board]);

    return useCallback(
        function AddDnDMovement(props: ComputedBoardProps<TBoardProps>) {
            const rnwModel = getRnWModel();

            const moveblePositions = rnwModel.getPiecesThatCanMove().map((piece) => piece.position);

            const destinationsFrom = (coord: SquareCoordinate) => {
                const piece = rnwModel.getPieceFromPosition(coord);
                return piece !== undefined ? rnwModel.possibleDestinations(piece) : [];
            };

            const onMove = (from: SquareCoordinate, to: SquareCoordinate) => {
                const piece = rnwModel.getPieceFromPosition(from);
                if (piece === undefined) return;
                if (!rnwModel.canMoveTo(piece, to)) return;

                getRnWActions().setNextMovePiece(piece, to);
            };

            return (
                <Component
                    {...props}
                    moveblePositions={moveblePositions}
                    destinationsFrom={destinationsFrom}
                    onMove={onMove}
                />
            );
        },
        [Component, getRnWActions, getRnWModel],
    );
}
