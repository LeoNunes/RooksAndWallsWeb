import { ComponentType, useCallback, useMemo } from 'react';
import { EdgeCoordinate } from 'Domain/Common/Coordinates';
import { Dispatch } from 'Domain/Common/DataTypes';
import { RnWModel } from 'Domain/RnW/Model';
import { RnWActions } from 'Domain/RnW/Actions';
import { RnWGameAction as ServerGameAction } from 'Services/RnWServer/Actions';
import withPlacementMode, {
    BoardProps,
    ComputedBoardProps,
} from 'Components/Board/withPlacementMode';
import { Wall } from 'Components/Pieces/Wall';

export default function useWallPlacement<
    TBoardProps extends BoardProps<EdgeCoordinate, 'createEdgeContent'>,
>(
    Board: ComponentType<ComputedBoardProps<EdgeCoordinate, TBoardProps>>,
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerGameAction>,
): ComponentType<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {
    const Component = useMemo(
        () =>
            withPlacementMode<EdgeCoordinate, 'createEdgeContent', TBoardProps>(
                Board,
                'createEdgeContent',
            ),
        [Board],
    );
    return useCallback(
        function AddWallPlacement(props: ComputedBoardProps<EdgeCoordinate, TBoardProps>) {
            const rnwModel = getRnWModel();

            function placeble(props: React.PropsWithChildren) {
                return <Wall>{props.children}</Wall>;
            }

            const placebleCoordinates = rnwModel.availableEdgesForPlacingWalls();

            function onPlace(coord: EdgeCoordinate) {
                getRnWActions().setNextMoveWall(coord);
                getRnWActions().commitMove(websocketDispatch);
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
        [Component, getRnWActions, getRnWModel, websocketDispatch],
    );
}
