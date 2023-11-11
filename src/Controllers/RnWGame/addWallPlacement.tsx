import React from 'react';
import { EdgeCoordinate } from '../../Data/Common/Coordinates';
import { Dispatch } from '../../Data/Common/DataTypes';
import { RnWModel } from '../../Data/RnW/Model';
import { RnWActions } from '../../Data/RnW/Actions';
import { ServerAction } from '../../Services/RnWServer/Data';
import withPlacementMode, {
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withPlacementMode';
import { Wall } from '../../Components/Pieces/Wall';

export default function addWallPlacement<
    TBoardProps extends BoardProps<EdgeCoordinate, 'createEdgeContent'>,
>(
    Board: React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>>,
    rnwModel: RnWModel,
    rnwActions: RnWActions,
    websocketDispatch: Dispatch<ServerAction>,
): React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {
    if (rnwModel.playerCurrentAction() !== 'add_wall') return Board;

    function placeble(props: React.PropsWithChildren) {
        return <Wall>{props.children}</Wall>;
    }

    const placebleCoordinates = rnwModel.availableEdgesForPlacingWalls();

    function onPlace(coord: EdgeCoordinate) {
        rnwActions.setNextMoveWall(coord);
        rnwActions.commitMove(websocketDispatch);
    }

    const Component = withPlacementMode<EdgeCoordinate, 'createEdgeContent', TBoardProps>(
        Board,
        'createEdgeContent',
    );
    return function AddWallPlacement(props: ComputedBoardProps<EdgeCoordinate, TBoardProps>) {
        return (
            <Component
                {...props}
                placeble={placeble}
                placebleCoordinates={placebleCoordinates}
                onPlace={onPlace}
            />
        );
    };
}
