import React from 'react';
import { RnWState } from '../../Data/RnW/Model';
import withWalls, {
    BoardProps,
    ComputedBoardProps,
    WallData,
} from '../../Components/Board/withWalls';

export default function addWalls<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    rnwState: RnWState,
): React.FC<ComputedBoardProps<TBoardProps>> {
    const wallsData: WallData[] = rnwState.walls.map(wall => ({
        coordinate: wall.position,
    }));
    if (rnwState.nextMove.wallPosition !== undefined) {
        wallsData.push({ coordinate: rnwState.nextMove.wallPosition });
    }

    const Component = withWalls(Board);
    return function AddWalls(props: ComputedBoardProps<TBoardProps>) {
        return <Component {...props} wallsData={wallsData} />;
    };
}
