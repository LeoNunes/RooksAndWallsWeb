import { areCoordinatesEqual, type EdgeCoordinate } from "Domain/Common/Coordinates";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import "./withEdgePlacement.css";

type BaseWithEdgePlacementProps = {
    edgePlaceableCoordinates: EdgeCoordinate[];
    edgePlaceable: ComponentType;
    onEdgePlace: (coord: EdgeCoordinate) => void;
};

type BoardProps = {
    createEdgeContent?: (coord: EdgeCoordinate) => ReactNode;
};
export type WithEdgePlacementProps<TBoardProps> = TBoardProps & BaseWithEdgePlacementProps;

export default function withEdgePlacement<TBoardProps extends BoardProps>(
    Board: ComponentType<TBoardProps>,
): ComponentType<WithEdgePlacementProps<TBoardProps>> {
    return function WithEdgePlacement(props: WithEdgePlacementProps<TBoardProps>) {
        function createPlaceableAreas(coord: EdgeCoordinate) {
            if (props.edgePlaceableCoordinates.find((c) => areCoordinatesEqual(c, coord)) === undefined) {
                return props.createEdgeContent?.(coord);
            }

            return (
                <PlaceableArea placeable={props.edgePlaceable} onClick={() => props.onEdgePlace(coord)}>
                    {props.createEdgeContent?.(coord)}
                </PlaceableArea>
            );
        }

        return <Board {...props} createEdgeContent={createPlaceableAreas} />;
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
        <div className="edge-placeable-area-container">
            {props.children}
            <div className="edge-placeable-area" onClick={props.onClick}>
                <Placeable />
            </div>
        </div>
    );
}
/** biome-ignore-end lint/a11y/noStaticElementInteractions: Ignore */
/** biome-ignore-end lint/a11y/useKeyWithClickEvents: Ignore */
