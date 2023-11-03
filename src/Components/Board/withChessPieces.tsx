import React from 'react';
import { SquareCoordinate, areSquareCoordinatesEqual } from '../../Data/Common/Coordinates';
import ChessPiece, { ChessPieceProps } from './ChessPiece';

export type RequiredBoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => React.ReactNode,
};

export type PieceData = ChessPieceProps & {
    coordinate: SquareCoordinate,
};
export type WithChessPiecesProps<TBoardProps> = TBoardProps & {
    piecesData: PieceData[],
};
export default function withChessPieces<TBoardProps extends RequiredBoardProps>(
    Board: React.FC<TBoardProps>,
): React.FC<WithChessPiecesProps<TBoardProps>> {

    return function(props: WithChessPiecesProps<TBoardProps>) {

        function createPieces(coord: SquareCoordinate) {
            const pieceData = props.piecesData.find(p => areSquareCoordinatesEqual(p.coordinate, coord));
            if (!pieceData) return props.createSquareContent?.(coord);

            return (
                <ChessPiece {...pieceData}>
                    { props.createSquareContent?.(coord) }
                </ChessPiece>
            );
        }

        return (
            <Board {...props} createSquareContent={createPieces}/>
        );
    }
}
