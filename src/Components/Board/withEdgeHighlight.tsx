import { areCoordinatesEqual, type EdgeCoordinate } from "Domain/Common/Coordinates";
import type { ComponentType, ReactNode } from "react";
import "./withEdgeHighlight.css";

type BoardProps = {
    createEdgeContent?: (coord: EdgeCoordinate) => ReactNode;
};
type BaseWithEdgeHighlightProps = {
    highlightedEdges: EdgeCoordinate[];
};
export type WithEdgeHighlightProps<TBoardProps> = TBoardProps & BaseWithEdgeHighlightProps;

export default function withEdgeHighlight<TBoardProps extends BoardProps>(
    Board: ComponentType<TBoardProps>,
): ComponentType<WithEdgeHighlightProps<TBoardProps>> {
    return function WithEdgeHighlight(props: WithEdgeHighlightProps<TBoardProps>) {
        function createHighlightedArea(coord: EdgeCoordinate) {
            if (!props.highlightedEdges.find((highlight) => areCoordinatesEqual(highlight, coord))) {
                return props.createEdgeContent?.(coord);
            }

            return <div className="edge-highlight">{props.createEdgeContent?.(coord)}</div>;
        }

        return <Board {...props} createEdgeContent={createHighlightedArea} />;
    };
}
