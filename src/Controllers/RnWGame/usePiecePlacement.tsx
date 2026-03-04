import ChessPiece from "Components/Pieces/ChessPiece";
import type { SquareCoordinate } from "Domain/Common/Coordinates";
import type { Dispatch } from "Domain/Common/DataTypes";
import type { RnWActions } from "Domain/RnW/Actions";
import type { RnWModel } from "Domain/RnW/Model";
import { rnwConfig } from "RnWConfig";
import type { RnWGameAction as ServerGameAction } from "Services/RnWServer/Actions";
import { useCallback } from "react";

export default function usePiecePlacement(
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerGameAction>,
) {
    const rnwModel = getRnWModel();

    const placebleCoordinates = rnwModel.availableSquaresForPlacingPiece();

    const placeble = useCallback(
        () => <ChessPiece color={rnwConfig.players[rnwModel.localPlayer.number].color} type="rook" />,
        [rnwModel.localPlayer.number],
    );

    function onPlace(coord: SquareCoordinate) {
        if (!rnwModel.canPlacePiece(coord)) return;

        getRnWActions().addPiece(rnwModel.localPlayer, coord, websocketDispatch);
    }

    return {
        squarePlaceble: placeble,
        squarePlacebleCoordinates: placebleCoordinates,
        onSquarePlace: onPlace,
    };
}
