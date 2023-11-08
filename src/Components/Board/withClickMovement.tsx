import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { WithNoIntersection, removeKeysFromObject } from '../../Util';
import { SquareCoordinate, areSquareCoordinatesEqual } from '../../Data/Common/Coordinates';
import './withClickMovement.css';

export type BoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => ReactNode;
};
type BaseWithClickMovementProps = {
    moveblePositions: SquareCoordinate[];
    destinationsFrom: (coord: SquareCoordinate) => SquareCoordinate[];
    onMove: (from: SquareCoordinate, to: SquareCoordinate) => void;
};
export type ComputedBoardProps<TBoardProps> = WithNoIntersection<
    TBoardProps,
    BaseWithClickMovementProps
>;
export type WithClickMovementProps<TBoardProps> = TBoardProps & BaseWithClickMovementProps;

export default function withClickMovement<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
): React.FC<WithClickMovementProps<TBoardProps>> {
    return function WithClickMovement(props: WithClickMovementProps<TBoardProps>) {
        const [selected, setSelected] = useState<SquareCoordinate | undefined>(undefined);
        const [highlightedPositions, setHighlightedPositions] = useState<SquareCoordinate[]>([]);

        function createClickableArea(coord: SquareCoordinate) {
            return (
                <ClickableArea
                    isSelected={
                        selected !== undefined && areSquareCoordinatesEqual(coord, selected)
                    }
                    isHighlighted={
                        highlightedPositions.find(c => areSquareCoordinatesEqual(coord, c)) !==
                        undefined
                    }
                    handleClick={handleClick(
                        coord,
                        props,
                        selected,
                        setSelected,
                        setHighlightedPositions,
                    )}
                >
                    {props.createSquareContent?.(coord)}
                </ClickableArea>
            );
        }

        const boardProps = removeKeysFromObject<TBoardProps, BaseWithClickMovementProps>(props, {
            destinationsFrom: true,
            moveblePositions: true,
            onMove: true,
        });
        return <Board {...boardProps} createSquareContent={createClickableArea} />;
    };
}

const handleClick =
    <TBoardProps,>(
        clickCoordinate: SquareCoordinate,
        props: WithClickMovementProps<TBoardProps>,
        selected: SquareCoordinate | undefined,
        setSelected: React.Dispatch<React.SetStateAction<SquareCoordinate | undefined>>,
        setHighlightedPositions: React.Dispatch<React.SetStateAction<SquareCoordinate[]>>,
    ) =>
    () => {
        if (selected) {
            setSelected(undefined);
            setHighlightedPositions([]);
            if (
                props
                    .destinationsFrom(selected)
                    .find(c => areSquareCoordinatesEqual(c, clickCoordinate))
            ) {
                props.onMove(selected, clickCoordinate);
            }
        } else {
            const isMoveble = !!props.moveblePositions.find(p =>
                areSquareCoordinatesEqual(p, clickCoordinate),
            );
            if (!isMoveble) return;
            setSelected(clickCoordinate);
            setHighlightedPositions(props.destinationsFrom(clickCoordinate));
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
        <div
            className={`click-movement ${selected ? 'selected' : ''} ${
                highlighted ? 'highlighted' : ''
            }`}
            onClick={handleClick}
        >
            {props.children}
        </div>
    );
}
