import { ComponentType, useCallback, useMemo } from 'react';
import { ChessPieceTypes } from 'Domain/Common/PieceTypes';
import { RnWModel } from 'Domain/RnW/Model';
import withChessPieces, {
    PieceData,
    BoardProps,
    ComputedBoardProps,
} from 'Components/Board/withChessPieces';

export default function usePieces<TBoardProps extends BoardProps>(
    Board: ComponentType<ComputedBoardProps<TBoardProps>>,
    getRnWModel: () => RnWModel,
): ComponentType<ComputedBoardProps<TBoardProps>> {
    const Component = useMemo(() => withChessPieces(Board), [Board]);

    return useCallback(
        function AddPieces(props: ComputedBoardProps<TBoardProps>) {
            const rnwModel = getRnWModel();
            const nextMove = rnwModel.nextMove;
            const piecesData: PieceData[] = rnwModel.pieces
                .map(piece => ({
                    coordinate:
                        nextMove.piece?.id === piece.id ? nextMove.piecePosition!! : piece.position,
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

            return <Component {...props} piecesData={piecesData} />;
        },
        [Component, getRnWModel],
    );
}
