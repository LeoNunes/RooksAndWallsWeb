import React from 'react';
import { Piece as PieceData } from '../../Data/GameData/Model';
import blueRookImage from '../../resources/img/bluerook.svg';
import greenRookImage from '../../resources/img/greenrook.svg';
import redRookImage from '../../resources/img/redrook.svg';
import yellowRookImage from '../../resources/img/yellowrook.svg'
import './Piece.css';

const rookImages = [ blueRookImage, yellowRookImage, redRookImage, greenRookImage ];
type PieceProps = {
    piece: PieceData,
};
export default function Piece({ piece }: PieceProps) {
    return (
        <div className='piece'
             style={{ backgroundImage: `url(${rookImages[piece.owner]})` }}/>
    );
};