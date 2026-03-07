import { areSquareCoordinatesEqual, type SquareCoordinate } from "Domain/Common/Coordinates";
import {
    type ComponentType,
    type Dispatch,
    type PropsWithChildren,
    type ReactNode,
    type SetStateAction,
    useState,
} from "react";
import "./withClickMovement.css";

type BoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => ReactNode;
};
type BaseWithClickMovementProps = {
    movablePositions: SquareCoordinate[];
    destinationsFrom: (coord: SquareCoordinate) => SquareCoordinate[];
    onMove: (from: SquareCoordinate, to: SquareCoordinate) => void;
};
export type WithClickMovementProps<TBoardProps> = TBoardProps & BaseWithClickMovementProps;

export default function withClickMovement<TBoardProps extends BoardProps>(
    Board: ComponentType<TBoardProps>,
): ComponentType<WithClickMovementProps<TBoardProps>> {
    return function WithClickMovement(props: WithClickMovementProps<TBoardProps>) {
        const [selected, setSelected] = useState<SquareCoordinate | undefined>(undefined);
        const highlightedPositions = selected ? props.destinationsFrom(selected) : [];

        function createClickableArea(coord: SquareCoordinate) {
            return (
                <ClickableArea
                    isSelected={selected !== undefined && areSquareCoordinatesEqual(coord, selected)}
                    isHighlighted={highlightedPositions.some((c) => areSquareCoordinatesEqual(coord, c))}
                    handleClick={handleClick(coord, props, selected, setSelected)}
                >
                    {props.createSquareContent?.(coord)}
                </ClickableArea>
            );
        }

        return <Board {...props} createSquareContent={createClickableArea} />;
    };
}

const handleClick =
    <TBoardProps,>(
        clickCoordinate: SquareCoordinate,
        props: WithClickMovementProps<TBoardProps>,
        selected: SquareCoordinate | undefined,
        setSelected: Dispatch<SetStateAction<SquareCoordinate | undefined>>,
    ) =>
    () => {
        if (selected) {
            setSelected(undefined);
            if (props.destinationsFrom(selected).some((c) => areSquareCoordinatesEqual(c, clickCoordinate))) {
                props.onMove(selected, clickCoordinate);
            }
        } else {
            if (!props.movablePositions.some((p) => areSquareCoordinatesEqual(p, clickCoordinate))) return;
            setSelected(clickCoordinate);
        }
    };

type ClickableAreaProps = PropsWithChildren<{
    isSelected: boolean;
    isHighlighted: boolean;
    handleClick: () => void;
}>;
function ClickableArea(props: ClickableAreaProps) {
    const { isSelected: selected, isHighlighted: highlighted, handleClick } = props;
    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: Ignore
        // biome-ignore lint/a11y/useKeyWithClickEvents: Ignore
        <div
            className={`click-movement ${selected ? "selected" : ""} ${highlighted ? "highlighted" : ""}`}
            onClick={handleClick}
        >
            {props.children}
        </div>
    );
}
