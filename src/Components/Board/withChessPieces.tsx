import ChessPiece, { type ChessPieceProps } from "Components/Pieces/ChessPiece";
import { areSquareCoordinatesEqual, type SquareCoordinate } from "Domain/Common/Coordinates";
import type { ComponentType, ReactNode } from "react";

export type PieceData = ChessPieceProps & {
    coordinate: SquareCoordinate;
};
type BaseWithChessPiecesProps = {
    piecesData: PieceData[];
};
type BoardProps = {
    createSquareContent?: (coord: SquareCoordinate) => ReactNode;
};
export type WithChessPiecesProps<TBoardProps> = TBoardProps & BaseWithChessPiecesProps;

export default function withChessPieces<TBoardProps extends BoardProps>(
    Board: ComponentType<TBoardProps>,
): ComponentType<WithChessPiecesProps<TBoardProps>> {
    return function WithChessPieces(props: WithChessPiecesProps<TBoardProps>) {
        function createPieces(coord: SquareCoordinate) {
            const pieceData = props.piecesData.find((p) => areSquareCoordinatesEqual(p.coordinate, coord));
            if (!pieceData) return props.createSquareContent?.(coord);

            return <ChessPiece {...pieceData}>{props.createSquareContent?.(coord)}</ChessPiece>;
        }

        return <Board {...props} createSquareContent={createPieces} />;
    };
}
