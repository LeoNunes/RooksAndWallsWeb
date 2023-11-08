import React from 'react';
import { EdgeCoordinate } from '../../Data/Common/Coordinates';
import { AsyncDispatch } from '../../Data/Common/DataTypes';
import { RnWState, modelBuilder } from '../../Data/RnW/Model';
import { RnWAction, addWallActionCreator } from '../../Data/RnW/Actions';
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
    rnwDispatch: AsyncDispatch<RnWAction>,
): React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {
    const model = modelBuilder(rnwState);
    if (rnwState.stage !== 'moves' || !model.isPlayersTurn()) return Board;

    function placeble(props: React.PropsWithChildren) {
        return <Wall>{props.children}</Wall>;
    }

    const placebleCoordinates = model.availableEdgesForPlacingWalls();

    function onPlace(coord: EdgeCoordinate) {
        rnwDispatch(addWallActionCreator(coord));
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
