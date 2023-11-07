import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { WithNoIntersection, removeKeysFromObject } from '../../Util';
import { Coordinate, areCoordinatesEqual } from '../../Data/Common/Coordinates';
import './withPlacementMode.css';

type BaseWithPlacementModeProps<TCoord> = {
    placebleCoordinates: TCoord[],
    placeble: React.FC<PropsWithChildren>,
    onPlace: (coord: TCoord) => void,
};

export type BoardProps<C extends Coordinate, K extends keyof any> = {
    [P in K]?: (coord: C) => ReactNode;
};
export type ComputedBoardProps<TCoord, TBoardProps> = WithNoIntersection<TBoardProps, BaseWithPlacementModeProps<TCoord>>;
export type WithPlacementModeProps<TCoord, TBoardProps> = TBoardProps & BaseWithPlacementModeProps<TCoord>;

export default function withPlacementMode<
    TCoord extends Coordinate,
    TContentKey extends keyof TBoardProps,
    TBoardProps extends BoardProps<TCoord, TContentKey>
>(
    Board: React.FC<ComputedBoardProps<TCoord, TBoardProps>>,
    createContentKey: TContentKey
): React.FC<WithPlacementModeProps<TCoord, TBoardProps>> {
    
    return function WithPlacementMode(props: WithPlacementModeProps<TCoord, TBoardProps>) {
        
        function createPlacebleAreas(coord: TCoord) {
            if (props.placebleCoordinates.find(c => areCoordinatesEqual(c, coord)) === undefined) {
                return props[createContentKey]?.(coord);
            }

            return (
                <PlacebleArea placeble={props.placeble} onClick={() => props.onPlace(coord)}>
                    { props[createContentKey]?.(coord) }
                </PlacebleArea>
            );
        }

        const boardProps = removeKeysFromObject<TBoardProps, BaseWithPlacementModeProps<TCoord>>(
            props, { onPlace: true, placeble: true, placebleCoordinates: true });
        return (
            <Board {...boardProps} { ...{[createContentKey]: createPlacebleAreas} } />
        );
    }
}

type PlacebleAreaProps = PropsWithChildren<{
    placeble: React.FC<PropsWithChildren>,
    onClick: () => void,
}>;
function PlacebleArea(props: PlacebleAreaProps) {
    const [isOver, setIsOver] = useState(false);
    const Placeble = props.placeble;

    return (
        <div className={`placeble-area ${isOver ? 'over' : ''}`}
             onMouseOver={() => setIsOver(true)}
             onMouseOut={() => setIsOver(false)}
             onClick={props.onClick}>
            <Placeble>
                { props.children }
            </Placeble>
        </div>
    );
}
