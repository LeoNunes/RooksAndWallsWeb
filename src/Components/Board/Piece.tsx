import React from 'react';
import { BoardPiece as PieceData } from '../../Data/BoardData/Model';
import './Piece.css';

type PieceProps = {
    piece: PieceData,
};
export default function Piece({ piece }: PieceProps) {
    return (
        <div className='piece'
             style={{ backgroundImage: `url(${piece.config.uri})` }}/>
    );
};
