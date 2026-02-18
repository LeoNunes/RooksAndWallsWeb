import { areCoordinatesEqual, type SquareCoordinate } from "Domain/Common/Coordinates";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import "./withSquarePlacement.css";

type BaseWithSquarePlacementProps = {
    squarePlacebleCoordinates: SquareCoordinate[];
    squarePlaceble: ComponentType;
    onSquarePlace: (coord: SquareCoordinate) => void;
};

type BoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => ReactNode;
};
export type WithSquarePlacementProps<TBoardProps> = TBoardProps & BaseWithSquarePlacementProps;

export default function withSquarePlacement<TBoardProps extends BoardProps>(
    Board: ComponentType<TBoardProps>,
): ComponentType<WithSquarePlacementProps<TBoardProps>> {
    return function WithSquarePlacement(props: WithSquarePlacementProps<TBoardProps>) {
        function createPlacebleAreas(coord: SquareCoordinate) {
            if (props.squarePlacebleCoordinates.find((c) => areCoordinatesEqual(c, coord)) === undefined) {
                return props.createSquareContent?.(coord);
            }

            return (
                <PlacebleArea placeble={props.squarePlaceble} onClick={() => props.onSquarePlace(coord)}>
                    {props.createSquareContent?.(coord)}
                </PlacebleArea>
            );
        }

        return <Board {...props} createSquareContent={createPlacebleAreas} />;
    };
}

/** biome-ignore-start lint/a11y/noStaticElementInteractions: Ignore */
/** biome-ignore-start lint/a11y/useKeyWithClickEvents: Ignore */
type PlacebleAreaProps = PropsWithChildren<{
    placeble: ComponentType;
    onClick: () => void;
}>;
function PlacebleArea(props: PlacebleAreaProps) {
    const Placeble = props.placeble;

    return (
        <div className="square-placeble-area-container">
            {props.children}
            <div className="square-placeble-area" onClick={props.onClick}>
                <Placeble />
            </div>
        </div>
    );
}
/** biome-ignore-end lint/a11y/noStaticElementInteractions: Ignore */
/** biome-ignore-end lint/a11y/useKeyWithClickEvents: Ignore */
