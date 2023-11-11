import React from 'react';
import { RnWModel } from '../../Domain/RnW/Model';
import withWalls, {
    BoardProps,
    ComputedBoardProps,
    WallData,
} from '../../Components/Board/withWalls';

export default function addWalls<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    rnwModel: RnWModel,
): React.FC<ComputedBoardProps<TBoardProps>> {
    const wallsData: WallData[] = rnwModel.walls.map(wall => ({
        coordinate: wall.position,
    }));
    if (rnwModel.nextMove.wallPosition !== undefined) {
        wallsData.push({ coordinate: rnwModel.nextMove.wallPosition });
    }

    const Component = withWalls(Board);
    return function AddWalls(props: ComputedBoardProps<TBoardProps>) {
        return <Component {...props} wallsData={wallsData} />;
    };
}
