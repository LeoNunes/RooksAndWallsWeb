import React, { ReactNode } from 'react';
import { EdgeCoordinate, areEdgeCoordinatesEqual } from '../../Data/Common/Coordinates';
import { Wall } from './Wall';

export type RequiredBoardProps = {
    createEdgeContent?: (coord: EdgeCoordinate) => ReactNode,
};
export type WallData = {
    coordinate: EdgeCoordinate,
};
export type WithWallsProps<TBoardProps> = TBoardProps & {
    wallsData: WallData[],
};
export default function withWalls<TBoardProps extends RequiredBoardProps>(
    Board: React.FC<TBoardProps>
): React.FC<WithWallsProps<TBoardProps>> {

    return function(props: WithWallsProps<TBoardProps>) {

        function createWalls(coord: EdgeCoordinate) {
            const wallData = props.wallsData.find(w => areEdgeCoordinatesEqual(w.coordinate, coord));
            if (!wallData) return props.createEdgeContent;

            return (
                <Wall>
                    { props.createEdgeContent?.(coord) }
                </Wall>
            );
        }

        return <Board {...props} createEdgeContent={createWalls}/>
    }
}
