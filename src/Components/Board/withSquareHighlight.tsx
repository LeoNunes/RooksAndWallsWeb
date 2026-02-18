import { areCoordinatesEqual, type SquareCoordinate } from "Domain/Common/Coordinates";
import type { ComponentType, ReactNode } from "react";
import "./withSquareHighlight.css";

type BoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => ReactNode;
};
type BaseWithSquareHighlightProps = {
    highlightedSquares: SquareCoordinate[];
};
export type WithSquareHighlightProps<TBoardProps> = TBoardProps & BaseWithSquareHighlightProps;

export default function withSquareHighlight<TBoardProps extends BoardProps>(
    Board: ComponentType<TBoardProps>,
): ComponentType<WithSquareHighlightProps<TBoardProps>> {
    return function WithSquareHighlight(props: WithSquareHighlightProps<TBoardProps>) {
        function createHighlightedArea(coord: SquareCoordinate) {
            if (!props.highlightedSquares.find((highlight) => areCoordinatesEqual(highlight, coord))) {
                return props.createSquareContent?.(coord);
            }

            return <div className="square-highlight">{props.createSquareContent?.(coord)}</div>;
        }

        return <Board {...props} createSquareContent={createHighlightedArea} />;
    };
}
