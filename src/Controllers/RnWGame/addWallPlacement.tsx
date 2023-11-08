import React from 'react';
import { EdgeCoordinate } from '../../Data/Common/Coordinates';
import { RnWData, modelBuilder } from '../../Data/RnW/Model';
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
    rnwData: RnWData,
    rnwDataDispatch: React.Dispatch<RnWAction>,
): React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {
    const model = modelBuilder(rnwData);
    if (rnwData.stage !== 'moves' || !model.isPlayersTurn()) return Board;

    function placeble(props: React.PropsWithChildren) {
        return <Wall>{props.children}</Wall>;
    }

    const placebleCoordinates = model.availableEdgesForPlacingWalls();

    function onPlace(coord: EdgeCoordinate) {
        rnwDataDispatch(addWallActionCreator(coord));
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
