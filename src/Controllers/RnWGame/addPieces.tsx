import React from 'react';
import { ChessPieceTypes } from '../../Data/Common/PieceTypes';
import { RnWModel } from '../../Data/RnW/Model';
import withChessPieces, {
    PieceData,
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withChessPieces';

export default function addPieces<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    rnwModel: RnWModel,
): React.FC<ComputedBoardProps<TBoardProps>> {
    const nextMove = rnwModel.nextMove;
    const piecesData: PieceData[] = rnwModel.pieces
        .map(piece => ({
            coordinate: nextMove.piece?.id === piece.id ? nextMove.piecePosition!! : piece.position,
            player: piece.owner,
            type: 'rook' as ChessPieceTypes,
        }))
        .concat(
            rnwModel.deadPieces.map(piece => ({
                coordinate: piece.position,
                player: piece.owner,
                type: 'rook' as ChessPieceTypes,
                disabled: true,
            })),
        );

    const Component = withChessPieces(Board);
    return function AddPieces(props: ComputedBoardProps<TBoardProps>) {
        return <Component {...props} piecesData={piecesData} />;
    };
}
