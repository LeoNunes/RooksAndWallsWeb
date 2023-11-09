import React from 'react';
import { EdgeCoordinate } from '../../Data/Common/Coordinates';
import { Dispatch } from '../../Data/Common/DataTypes';
import { RnWState, modelBuilder } from '../../Data/RnW/Model';
import { RnWDispatch, commitMove, setNextMoveWall } from '../../Data/RnW/Actions';
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
    rnwState: RnWState,
    rnwDispatch: RnWDispatch,
    websocketDispatch: Dispatch<ServerAction>,
): React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {
    const model = modelBuilder(rnwState);

    if (model.playerCurrentAction() !== 'add_wall') return Board;

    function placeble(props: React.PropsWithChildren) {
        return <Wall>{props.children}</Wall>;
    }

    const placebleCoordinates = model.availableEdgesForPlacingWalls();

    function onPlace(coord: EdgeCoordinate) {
        rnwDispatch(setNextMoveWall(coord));
        rnwDispatch(commitMove(websocketDispatch));
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
