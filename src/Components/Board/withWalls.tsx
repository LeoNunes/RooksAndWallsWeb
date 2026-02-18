import { Wall } from "Components/Pieces/Wall";
import { areEdgeCoordinatesEqual, type EdgeCoordinate } from "Domain/Common/Coordinates";
import type { ComponentType, ReactNode } from "react";

export type WallData = {
    coordinate: EdgeCoordinate;
};
type BaseWithWallsProps = {
    wallsData: WallData[];
};
type BoardProps = {
    createEdgeContent?: (coord: EdgeCoordinate) => ReactNode;
};
export type WithWallsProps<TBoardProps> = TBoardProps & BaseWithWallsProps;

export default function withWalls<TBoardProps extends BoardProps>(
    Board: ComponentType<TBoardProps>,
): ComponentType<WithWallsProps<TBoardProps>> {
    return function WithWalls(props: WithWallsProps<TBoardProps>) {
        function createWalls(coord: EdgeCoordinate) {
            const wallData = props.wallsData.find((w) => areEdgeCoordinatesEqual(w.coordinate, coord));
            if (!wallData) return props.createEdgeContent?.(coord);

            return <Wall>{props.createEdgeContent?.(coord)}</Wall>;
        }

        return <Board {...props} createEdgeContent={createWalls} />;
    };
}
