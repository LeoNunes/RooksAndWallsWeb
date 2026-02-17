import withChessPieces, {
    type BoardProps,
    type ComputedBoardProps,
    type PieceData,
} from "Components/Board/withChessPieces";
import type { ChessPieceTypes } from "Domain/Common/PieceTypes";
import type { RnWModel } from "Domain/RnW/Model";
import { type ComponentType, useCallback, useMemo } from "react";

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
                .map((piece) => ({
                    // TODO: Fix this
                    // biome-ignore lint/style/noNonNullAssertion: TODO
                    coordinate: nextMove.piece?.id === piece.id ? nextMove.piecePosition! : piece.position,
                    player: piece.owner,
                    type: "rook" as ChessPieceTypes,
                }))
                .concat(
                    rnwModel.deadPieces.map((piece) => ({
                        coordinate: piece.position,
                        player: piece.owner,
                        type: "rook" as ChessPieceTypes,
                        disabled: true,
                    })),
                );

            return <Component {...props} piecesData={piecesData} />;
        },
        [Component, getRnWModel],
    );
}
