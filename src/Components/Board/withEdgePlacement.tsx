import { areCoordinatesEqual, type EdgeCoordinate } from "Domain/Common/Coordinates";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import "./withEdgePlacement.css";

type BaseWithEdgePlacementProps = {
    edgePlacebleCoordinates: EdgeCoordinate[];
    edgePlaceble: ComponentType;
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
        function createPlacebleAreas(coord: EdgeCoordinate) {
            if (props.edgePlacebleCoordinates.find((c) => areCoordinatesEqual(c, coord)) === undefined) {
                return props.createEdgeContent?.(coord);
            }

            return (
                <PlacebleArea placeble={props.edgePlaceble} onClick={() => props.onEdgePlace(coord)}>
                    {props.createEdgeContent?.(coord)}
                </PlacebleArea>
            );
        }

        return <Board {...props} createEdgeContent={createPlacebleAreas} />;
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
        <div className="edge-placeble-area-container">
            {props.children}
            <div className="edge-placeble-area" onClick={props.onClick}>
                <Placeble />
            </div>
        </div>
    );
}
/** biome-ignore-end lint/a11y/noStaticElementInteractions: Ignore */
/** biome-ignore-end lint/a11y/useKeyWithClickEvents: Ignore */
