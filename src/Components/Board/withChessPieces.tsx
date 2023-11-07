import React from 'react';
import { WithNoIntersection, removeKeysFromObject } from '../../Util';
import { SquareCoordinate, areSquareCoordinatesEqual } from '../../Data/Common/Coordinates';
import ChessPiece, { ChessPieceProps } from '../Pieces/ChessPiece';

export type PieceData = ChessPieceProps & {
    coordinate: SquareCoordinate,
};
type BaseWithChessPiecesProps = {
    piecesData: PieceData[],
};
export type BoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => React.ReactNode,
};
export type ComputedBoardProps<TBoardProps> = WithNoIntersection<TBoardProps, BaseWithChessPiecesProps>;
export type WithChessPiecesProps<TBoardProps> = TBoardProps & BaseWithChessPiecesProps;

export default function withChessPieces<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
): React.FC<WithChessPiecesProps<TBoardProps>> {

    return function WithChessPieces(props: WithChessPiecesProps<TBoardProps>) {

        function createPieces(coord: SquareCoordinate) {
            const pieceData = props.piecesData.find(p => areSquareCoordinatesEqual(p.coordinate, coord));
            if (!pieceData) return props.createSquareContent?.(coord);

            return (
                <ChessPiece {...pieceData}>
                    { props.createSquareContent?.(coord) }
                </ChessPiece>
            );
        }

        const boardProps = removeKeysFromObject<TBoardProps, BaseWithChessPiecesProps>(props, { piecesData: true });
        return <Board {...boardProps} createSquareContent={createPieces}/>;
    }
}
