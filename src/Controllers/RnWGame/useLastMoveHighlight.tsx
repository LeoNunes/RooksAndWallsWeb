import {
    areEdgeCoordinatesEqual,
    areSquareCoordinatesEqual,
    type EdgeCoordinate,
    type SquareCoordinate,
} from "Domain/Common/Coordinates";
import type { RnWModel } from "Domain/RnW/Model";
import { useRef } from "react";

export default function useLastMoveHighlight(getRnWModel: () => RnWModel) {
    return {
        ...useEdgeLastMoveHighlight(getRnWModel),
        ...useSquareLastMoveHighlight(getRnWModel),
    };
}

function useSquareLastMoveHighlight(getRnWModel: () => RnWModel) {
    const rnwModel = getRnWModel();
    const lastStatePieces = useRef(rnwModel.pieces);
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

    return {
        highlightedSquares: lastMovement.current,
    };
}

function useEdgeLastMoveHighlight(getRnWModel: () => RnWModel) {
    const rnwModel = getRnWModel();
    const lastStateWalls = useRef(rnwModel.walls);
    const lastWallPosition = useRef<EdgeCoordinate[]>([]);

    // TODO: add moves history on the backend and get data here
    for (const wall of rnwModel.walls) {
        if (!lastStateWalls.current.find((w) => areEdgeCoordinatesEqual(w.position, wall.position))) {
            lastWallPosition.current = [wall.position];
        }
    }
    lastStateWalls.current = rnwModel.walls;

    return {
        highlightedEdges: lastWallPosition.current,
    };
}
