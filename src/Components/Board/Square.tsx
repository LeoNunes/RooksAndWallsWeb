import React from 'react';
import { SquareCoordinate, getPieceFromPosition } from '../../Data/GameData/Model';
import { useGameData } from '../../Data/GameData/GameDataProvider';
import Piece from './Piece';
import './Square.css';

type SquareProps = {
    color: 'black' | 'white',
    coordinate: SquareCoordinate,
};
export default function Square({ color, coordinate }: SquareProps) {
    const gameData = useGameData();
    const piece = getPieceFromPosition(gameData, coordinate);

    return (
        <div className={`board-square ${color}`}>
            { piece !== undefined && <Piece piece={piece}/> }
        </div>
    );
};