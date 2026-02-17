import withWalls, { type BoardProps, type ComputedBoardProps, type WallData } from "Components/Board/withWalls";
import type { RnWModel } from "Domain/RnW/Model";
import { type ComponentType, useCallback, useMemo } from "react";

export default function useWalls<TBoardProps extends BoardProps>(
    Board: ComponentType<ComputedBoardProps<TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<ComputedBoardProps<TBoardProps>> {
    const Component = useMemo(() => withWalls(Board), [Board]);

    return useCallback(
        function AddWalls(props: ComputedBoardProps<TBoardProps>) {
            const rnwModel = getRnWModel();
            const wallsData: WallData[] = rnwModel.walls.map((wall) => ({
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
