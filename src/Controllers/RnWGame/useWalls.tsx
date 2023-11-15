import { ComponentType, useCallback, useMemo } from 'react';
import { RnWModel } from '../../Domain/RnW/Model';
import withWalls, {
    BoardProps,
    ComputedBoardProps,
    WallData,
} from '../../Components/Board/withWalls';

export default function useWalls<TBoardProps extends BoardProps>(
    Board: ComponentType<ComputedBoardProps<TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<ComputedBoardProps<TBoardProps>> {
    const Component = useMemo(() => withWalls(Board), [Board]);

    return useCallback(
        function AddWalls(props: ComputedBoardProps<TBoardProps>) {
            const rnwModel = getRnWModel();
            const wallsData: WallData[] = rnwModel.walls.map(wall => ({
                coordinate: wall.position,
            }));
            if (rnwModel.nextMove.wallPosition !== undefined) {
                wallsData.push({ coordinate: rnwModel.nextMove.wallPosition });
            }

            return <Component {...props} wallsData={wallsData} />;
        },
        [Component, getRnWModel],
    );
}
