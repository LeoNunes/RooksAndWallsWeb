import type { WallData } from "Components/Board/withWalls";
import type { RnWModel } from "Domain/RnW/Model";

export default function useWalls(getRnWModel: () => RnWModel) {
    const rnwModel = getRnWModel();
    const wallsData: WallData[] = rnwModel.walls.map((wall) => ({
        coordinate: wall.position,
    }));
    if (rnwModel.nextMove.wallPosition !== undefined) {
        wallsData.push({ coordinate: rnwModel.nextMove.wallPosition });
    }

    return {
        wallsData: wallsData,
    };
}
