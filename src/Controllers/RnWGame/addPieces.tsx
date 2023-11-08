import React from 'react';
import { ChessPieceTypes } from '../../Data/Common/PieceTypes';
import { RnWState } from '../../Data/RnW/Model';
import withChessPieces, {
    PieceData,
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withChessPieces';

export default function addPieces<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    rnwState: RnWState,
): React.FC<ComputedBoardProps<TBoardProps>> {
    const piecesData: PieceData[] = rnwState.pieces
        .map(piece => ({
            coordinate: piece.position,
            player: piece.owner,
            type: 'rook' as ChessPieceTypes,
        }))
        .concat(
            rnwState.deadPieces.map(piece => ({
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
