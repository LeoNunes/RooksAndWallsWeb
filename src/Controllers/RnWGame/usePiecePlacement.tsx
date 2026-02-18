import ChessPiece from "Components/Pieces/ChessPiece";
import type { SquareCoordinate } from "Domain/Common/Coordinates";
import type { Dispatch } from "Domain/Common/DataTypes";
import type { RnWActions } from "Domain/RnW/Actions";
import type { RnWModel } from "Domain/RnW/Model";
import type { RnWGameAction as ServerGameAction } from "Services/RnWServer/Actions";
import { useCallback } from "react";

export default function usePiecePlacement(
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerGameAction>,
) {
    const rnwModel = getRnWModel();

    const placebleCoordinates = rnwModel.availableSquaresForPlacingPiece();

    const placeble = useCallback(() => <ChessPiece player={rnwModel.playerId} type="rook" />, [rnwModel.playerId]);

    function onPlace(coord: SquareCoordinate) {
        if (!rnwModel.canPlacePiece(coord)) return;

        getRnWActions().addPiece(rnwModel.playerId, coord, websocketDispatch);
    }

    return {
        squarePlaceble: placeble,
        squarePlacebleCoordinates: placebleCoordinates,
        onSquarePlace: onPlace,
    };
}
