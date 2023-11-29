import { ComponentType, ReactNode } from 'react';
import { WithNoIntersection, removeKeysFromObject } from 'Util';
import { EdgeCoordinate, areEdgeCoordinatesEqual } from 'Domain/Common/Coordinates';
import { Wall } from 'Components/Pieces/Wall';

export type WallData = {
    coordinate: EdgeCoordinate;
};
type BaseWithWallsProps = {
    wallsData: WallData[];
};
export type BoardProps = {
    createEdgeContent?: (coord: EdgeCoordinate) => ReactNode;
};
export type ComputedBoardProps<TBoardProps> = WithNoIntersection<TBoardProps, BaseWithWallsProps>;
export type WithWallsProps<TBoardProps> = TBoardProps & BaseWithWallsProps;

export default function withWalls<TBoardProps extends BoardProps>(
    Board: ComponentType<ComputedBoardProps<TBoardProps>>,
): ComponentType<WithWallsProps<TBoardProps>> {
    return function WithWalls(props: WithWallsProps<TBoardProps>) {
        function createWalls(coord: EdgeCoordinate) {
            const wallData = props.wallsData.find(w =>
                areEdgeCoordinatesEqual(w.coordinate, coord),
            );
            if (!wallData) return props.createEdgeContent?.(coord);

            return <Wall>{props.createEdgeContent?.(coord)}</Wall>;
        }

        const boardProps = removeKeysFromObject<TBoardProps, BaseWithWallsProps>(props, {
            wallsData: true,
        });
        return <Board {...boardProps} createEdgeContent={createWalls} />;
    };
}
