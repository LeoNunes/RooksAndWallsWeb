import type { ChessPieceTypes } from "Domain/Common/PieceTypes";
import { rnwAssets } from "RnWAssets";
import type { PieceColor } from "RnWConfig";
import type { PropsWithChildren } from "react";
import "./ChessPiece.css";

export type ChessPieceProps = {
    color: PieceColor;
    type: ChessPieceTypes;
    disabled?: boolean;
};
export default function ChessPiece(props: PropsWithChildren<ChessPieceProps>) {
    const assets = rnwAssets.pieces[props.color];
    const uri = props.disabled ? assets.disabled.uri : assets.default.uri;

    return (
        <div className="piece" style={{ backgroundImage: `url("${uri}")` }}>
            {props.children}
        </div>
    );
}
