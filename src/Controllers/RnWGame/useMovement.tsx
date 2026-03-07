import type { SquareCoordinate } from "Domain/Common/Coordinates";
import type { RnWActions } from "Domain/RnW/Actions";
import type { RnWModel } from "Domain/RnW/Model";

export default function useMovement(getRnWModel: () => RnWModel, getRnWActions: () => RnWActions) {
    const rnwModel = getRnWModel();

    const movablePositions = rnwModel.getPiecesThatCanMove().map((piece) => piece.position);

    const destinationsFrom = (coord: SquareCoordinate) => {
        const piece = rnwModel.getPieceFromPosition(coord);
        return piece !== undefined ? rnwModel.possibleDestinations(piece) : [];
    };

    const onMove = (from: SquareCoordinate, to: SquareCoordinate) => {
        const piece = rnwModel.getPieceFromPosition(from);
        if (piece === undefined) return;
        if (!rnwModel.canMoveTo(piece, to)) return;

        getRnWActions().setNextMovePieceMovement(piece, to);
    };

    return {
        movablePositions: movablePositions,
        destinationsFrom: destinationsFrom,
        onMove: onMove,
    };
}
