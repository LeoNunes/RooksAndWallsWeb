import React, { useCallback, useMemo } from 'react';
import { SquareCoordinate } from '../../Domain/Common/Coordinates';
import { Dispatch } from '../../Domain/Common/DataTypes';
import { RnWModel } from '../../Domain/RnW/Model';
import { RnWActions } from '../../Domain/RnW/Actions';
import { ServerAction } from '../../Services/RnWServer/Data';
import withPlacementMode, {
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withPlacementMode';
import ChessPiece from '../../Components/Pieces/ChessPiece';

export default function usePiecePlacement<
    TBoardProps extends BoardProps<SquareCoordinate, 'createSquareContent'>,
>(
    Board: React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>>,
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerAction>,
): React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>> {
    const Component = useMemo(
        () =>
            withPlacementMode<SquareCoordinate, 'createSquareContent', TBoardProps>(
                Board,
                'createSquareContent',
            ),
        [Board],
    );

    return useCallback(
        function AddPiecePlacement(props: ComputedBoardProps<SquareCoordinate, TBoardProps>) {
            const rnwModel = getRnWModel();

            const placebleCoordinates = rnwModel.availableSquaresForPlacingPiece();

            const placeble = useCallback(
                () => <ChessPiece player={rnwModel.playerId} type='rook' />,
                [rnwModel.playerId],
            );

            function onPlace(coord: SquareCoordinate) {
                if (!rnwModel.canPlacePiece(coord)) return;

                getRnWActions().addPiece(rnwModel.playerId, coord, websocketDispatch);
            }

            return (
                <Component
                    {...props}
                    placeble={placeble}
                    placebleCoordinates={placebleCoordinates}
                    onPlace={onPlace}
                />
            );
        },
        [Component, getRnWModel, getRnWActions, websocketDispatch],
    );
}
