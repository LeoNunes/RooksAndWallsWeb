import type { PieceData } from "Components/Board/withChessPieces";
import type { ChessPieceTypes } from "Domain/Common/PieceTypes";
import type { RnWModel } from "Domain/RnW/Model";

export default function usePieces(getRnWModel: () => RnWModel) {
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

    return {
        piecesData: piecesData,
    };
}
