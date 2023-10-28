import React from 'react';
import { PieceConfig } from '../../GameConfig';
import './Piece.css';

type PieceProps = {
    pieceConfig: PieceConfig;
    isPlacementMode: boolean;
};
export default function Piece({ pieceConfig, isPlacementMode }: PieceProps) {
    return (
        <div className={'piece' + (isPlacementMode ? ' placing' : '')}
             style={{ backgroundImage: `url(${pieceConfig.uri})` }}/>
    );
};
