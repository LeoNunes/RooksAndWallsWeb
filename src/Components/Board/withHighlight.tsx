import { areCoordinatesEqual, type Coordinate } from "Domain/Common/Coordinates";
import { removeKeysFromObject, type WithNoIntersection } from "Util";
import type { ComponentType, ReactNode } from "react";
import "./withHighlight.css";

type BaseWithHighlightProps<TCoord> = {
    highlighted: TCoord[];
};

// biome-ignore lint/suspicious/noExplicitAny: Ignore
export type BoardProps<C extends Coordinate, K extends keyof any> = {
    [P in K]?: (coord: C) => ReactNode;
};
export type ComputedBoardProps<TCoord, TBoardProps> = WithNoIntersection<TBoardProps, BaseWithHighlightProps<TCoord>>;
export type WithHighlightProps<TCoord, TBoardProps> = TBoardProps & BaseWithHighlightProps<TCoord>;

export default function withHighlight<
    TCoord extends Coordinate,
    TContentKey extends keyof TBoardProps,
    TBoardProps extends BoardProps<TCoord, TContentKey>,
>(
    Board: ComponentType<ComputedBoardProps<TCoord, TBoardProps>>,
    createContentKey: TContentKey,
): ComponentType<WithHighlightProps<TCoord, TBoardProps>> {
    return function WithHighlight(props: WithHighlightProps<TCoord, TBoardProps>) {
        function createHighlightedArea(coord: TCoord) {
            if (!props.highlighted.find((highlight) => areCoordinatesEqual(highlight, coord))) {
                return props[createContentKey]?.(coord);
            }

            return <div className="highlight">{props[createContentKey]?.(coord)}</div>;
        }

        const boardProps = removeKeysFromObject<TBoardProps, BaseWithHighlightProps<TCoord>>(props, {
            highlighted: true,
        });
        return <Board {...boardProps} {...{ [createContentKey]: createHighlightedArea }} />;
    };
}
