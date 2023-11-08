import React, { PropsWithChildren } from 'react';
import { ChessPieceTypes } from '../../Data/Common/PieceTypes';
import { rnwConfig } from '../../RnWConfig';
import './ChessPiece.css';

export type ChessPieceProps = {
    player: number;
    type: ChessPieceTypes;
    disabled?: boolean;
};
export default function ChessPiece(props: PropsWithChildren<ChessPieceProps>) {
    const color = rnwConfig.players[props.player].color;
    const piece = rnwConfig.pieces[color];
    const uri = props.disabled ? piece.disabled.uri : piece.default.uri;

    return (
        <div className='piece' style={{ backgroundImage: `url(${uri})` }}>
            {props.children}
        </div>
    );
}
