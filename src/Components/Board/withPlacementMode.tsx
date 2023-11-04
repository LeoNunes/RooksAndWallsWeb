import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { SquareCoordinate, areSquareCoordinatesEqual } from '../../Data/Common/Coordinates';
import ChessPiece, { ChessPieceProps } from './ChessPiece';
import './withPlacementMode.css';

export type RequiredBoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => ReactNode,
};
export type WithPlacementModeProps<TBoardProps> = TBoardProps & {
    placebleCoordinates: SquareCoordinate[],
    placeblePiece: ChessPieceProps,
    onPlace: (coord: SquareCoordinate) => void,
};
export default function withPlacementMode<TBoardProps extends RequiredBoardProps>(
    Board: React.FC<TBoardProps>
): React.FC<WithPlacementModeProps<TBoardProps>> {
    
    return function(props: WithPlacementModeProps<TBoardProps>) {
        
        function createPlacebleAreas(coord: SquareCoordinate) {
            if (props.placebleCoordinates.find(c => areSquareCoordinatesEqual(c, coord)) === undefined) {
                return props.createSquareContent;
            }

            return (
                <PlacebleArea placeblePiece={props.placeblePiece} onClick={() => props.onPlace(coord)}>
                    { props.createSquareContent?.(coord) }
                </PlacebleArea>
            );
        }

        return (
            <Board {...props} createSquareContent={createPlacebleAreas} />
        );
    }
}

type PlacebleAreaProps = PropsWithChildren<{
    placeblePiece: ChessPieceProps,
    onClick: () => void,
}>;
function PlacebleArea(props: PlacebleAreaProps) {
    const [isOver, setIsOver] = useState(false);

    // TODO: This is a temporary solution. As it is right now, it's hiding the children.
    // Adding and removing components can work badly with Mouse Over and Out events, causing bugs.
    return (
        <div className={`placeble-area ${isOver ? 'over' : ''}`}
             onMouseOver={() => setIsOver(true)}
             onMouseOut={() => setIsOver(false)}
             onClick={props.onClick}>
            <ChessPiece {...props.placeblePiece}>
                { props.children }
            </ChessPiece>
        </div>
    );
}
