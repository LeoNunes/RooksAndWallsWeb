import React from 'react';
import { RnWData } from '../../Data/RnW/Model';
import withWalls, {
    BoardProps,
    ComputedBoardProps,
    WallData,
} from '../../Components/Board/withWalls';

export default function addWalls<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    rnwData: RnWData,
): React.FC<ComputedBoardProps<TBoardProps>> {
    const wallsData: WallData[] = rnwData.walls.map(wall => ({
        coordinate: wall.position,
    }));

    const Component = withWalls(Board);
    return function AddWalls(props: ComputedBoardProps<TBoardProps>) {
        return <Component {...props} wallsData={wallsData} />;
    };
}
