import { areSquareCoordinatesEqual, type SquareCoordinate } from "Domain/Common/Coordinates";
import { removeKeysFromObject, type WithNoIntersection } from "Util";
import {
    DndContext,
    type DragEndEvent,
    type DragStartEvent,
    MouseSensor,
    pointerWithin,
    useDraggable,
    useDroppable,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { type ComponentType, type PropsWithChildren, type ReactNode, useState } from "react";
import "./withDnDMovement.css";

export type BoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => ReactNode;
};
type BaseWithDnDMovementProps = {
    moveblePositions: SquareCoordinate[];
    destinationsFrom: (coord: SquareCoordinate) => SquareCoordinate[];
    onMove: (from: SquareCoordinate, to: SquareCoordinate) => void;
};
export type ComputedBoardProps<TBoardProps> = WithNoIntersection<TBoardProps, BaseWithDnDMovementProps>;
export type WithDnDMovementProps<TBoardProps> = TBoardProps & BaseWithDnDMovementProps;

export default function withDnDMovement<TBoardProps extends BoardProps>(
    Board: ComponentType<ComputedBoardProps<TBoardProps>>,
): ComponentType<WithDnDMovementProps<TBoardProps>> {
    return function WithDnDMovement(props: WithDnDMovementProps<TBoardProps>) {
        const [destinations, setDestinations] = useState<SquareCoordinate[]>([]);
        const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 10 } }));

        function createDnDArea(coord: SquareCoordinate) {
            return (
                <DragAndDropArea
                    coord={coord}
                    canDrag={props.moveblePositions.find((p) => areSquareCoordinatesEqual(p, coord)) !== undefined}
                    canDrop={destinations.find((d) => areSquareCoordinatesEqual(d, coord)) !== undefined}
                >
                    {props.createSquareContent?.(coord)}
                </DragAndDropArea>
            );
        }

        function handleDragStart(event: DragStartEvent): void {
            const dragData = event.active.data.current as DragDataType;
            setDestinations(props.destinationsFrom(dragData.origin));
        }

        function handleDragEnd(event: DragEndEvent): void {
            const dragData = event.active.data.current as DragDataType;
            const dropData = event.over?.data.current as DropDataType | undefined;

            setDestinations([]);

            if (!dragData || !dropData) return;

            if (
                props.destinationsFrom(dragData.origin).find((c) => areSquareCoordinatesEqual(c, dropData.destination))
            ) {
                props.onMove(dragData.origin, dropData.destination);
            }
        }

        const boardProps = removeKeysFromObject<TBoardProps, BaseWithDnDMovementProps>(props, {
            destinationsFrom: true,
            moveblePositions: true,
            onMove: true,
        });

        return (
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                collisionDetection={pointerWithin}
            >
                <Board {...boardProps} createSquareContent={createDnDArea} />
            </DndContext>
        );
    };
}

type DragDataType = { origin: SquareCoordinate };
type DropDataType = { destination: SquareCoordinate };
type DragAndDropAreaProps = PropsWithChildren<{
    coord: SquareCoordinate;
    canDrag: boolean;
    canDrop: boolean;
}>;
function DragAndDropArea(props: DragAndDropAreaProps) {
    const {
        attributes,
        listeners,
        setNodeRef: setDraggableRef,
        transform,
    } = useDraggable({
        id: `drag-${props.coord.row}-${props.coord.column}`,
        data: { origin: props.coord } as DragDataType,
        disabled: !props.canDrag,
    });
    const dragStyle = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

    const { isOver, setNodeRef: setDroppableRef } = useDroppable({
        id: `drop-${props.coord.row}-${props.coord.column}`,
        data: { destination: props.coord } as DropDataType,
        disabled: !props.canDrop,
    });

    return (
        <div className={`dnd ${props.canDrop ? "droppable" : ""} ${isOver ? "over" : ""}`} ref={setDroppableRef}>
            <div
                className={`dnd ${props.canDrag ? "draggable" : ""}`}
                ref={setDraggableRef}
                style={dragStyle}
                {...listeners}
                {...attributes}
            >
                {props.children}
            </div>
        </div>
    );
}
