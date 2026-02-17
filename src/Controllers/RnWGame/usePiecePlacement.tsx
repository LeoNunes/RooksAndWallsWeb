import withPlacementMode, { type BoardProps, type ComputedBoardProps } from "Components/Board/withPlacementMode";
import ChessPiece from "Components/Pieces/ChessPiece";
import type { SquareCoordinate } from "Domain/Common/Coordinates";
import type { Dispatch } from "Domain/Common/DataTypes";
import type { RnWActions } from "Domain/RnW/Actions";
import type { RnWModel } from "Domain/RnW/Model";
import type { RnWGameAction as ServerGameAction } from "Services/RnWServer/Actions";
import { type ComponentType, useCallback, useMemo } from "react";

export default function usePiecePlacement<TBoardProps extends BoardProps<SquareCoordinate, "createSquareContent">>(
    Board: ComponentType<ComputedBoardProps<SquareCoordinate, TBoardProps>>,
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerGameAction>,
): ComponentType<ComputedBoardProps<SquareCoordinate, TBoardProps>> {
    const Component = useMemo(
        () => withPlacementMode<SquareCoordinate, "createSquareContent", TBoardProps>(Board, "createSquareContent"),
        [Board],
    );

    return useCallback(
        function AddPiecePlacement(props: ComputedBoardProps<SquareCoordinate, TBoardProps>) {
            const rnwModel = getRnWModel();

            const placebleCoordinates = rnwModel.availableSquaresForPlacingPiece();

            // TODO: Fix this
            // biome-ignore lint/correctness/useHookAtTopLevel: TODO
            const placeble = useCallback(
                () => <ChessPiece player={rnwModel.playerId} type="rook" />,
                [rnwModel.playerId],
            );

            function onPlace(coord: SquareCoordinate) {
                if (!rnwModel.canPlacePiece(coord)) return;

                getRnWActions().addPiece(rnwModel.playerId, coord, websocketDispatch);
            }

            return (
                <Component {...props} placeble={placeble} placebleCoordinates={placebleCoordinates} onPlace={onPlace} />
            );
        },
        [Component, getRnWModel, getRnWActions, websocketDispatch],
    );
}
