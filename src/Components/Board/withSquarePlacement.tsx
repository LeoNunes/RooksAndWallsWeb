import { areCoordinatesEqual, type SquareCoordinate } from "Domain/Common/Coordinates";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import "./withSquarePlacement.css";

type BaseWithSquarePlacementProps = {
    squarePlaceableCoordinates: SquareCoordinate[];
    squarePlaceable: ComponentType;
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
        function createPlaceableAreas(coord: SquareCoordinate) {
            if (props.squarePlaceableCoordinates.find((c) => areCoordinatesEqual(c, coord)) === undefined) {
                return props.createSquareContent?.(coord);
            }

            return (
                <PlaceableArea placeable={props.squarePlaceable} onClick={() => props.onSquarePlace(coord)}>
                    {props.createSquareContent?.(coord)}
                </PlaceableArea>
            );
        }

        return <Board {...props} createSquareContent={createPlaceableAreas} />;
    };
}

/** biome-ignore-start lint/a11y/noStaticElementInteractions: Ignore */
/** biome-ignore-start lint/a11y/useKeyWithClickEvents: Ignore */
type PlaceableAreaProps = PropsWithChildren<{
    placeable: ComponentType;
    onClick: () => void;
}>;
function PlaceableArea(props: PlaceableAreaProps) {
    const Placeable = props.placeable;

    return (
        <div className="square-placeable-area-container">
            {props.children}
            <div className="square-placeable-area" onClick={props.onClick}>
                <Placeable />
            </div>
        </div>
    );
}
/** biome-ignore-end lint/a11y/noStaticElementInteractions: Ignore */
/** biome-ignore-end lint/a11y/useKeyWithClickEvents: Ignore */
