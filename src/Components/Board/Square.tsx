import React from 'react';
import { getBoardPieceFromPosition, isSquareHighlighted } from '../../Data/BoardStateData/Model';
import { useBoardStateData } from '../../Data/BoardStateData/BoardStateDataProvider';
import { SquareCoordinate } from '../../Data/Common/Coordinates';
import Piece from './Piece';
import './Square.css';

type SquareProps = {
    color: 'black' | 'white',
    coordinate: SquareCoordinate,
    clicked?: (coordinate: SquareCoordinate) => void,
};
export default function Square(props: SquareProps) {
    const boardStateData = useBoardStateData();
    const piece = getBoardPieceFromPosition(boardStateData, props.coordinate);

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.clicked) {
            props.clicked(props.coordinate);
        }
    };

    const highlight = isSquareHighlighted(boardStateData, props.coordinate);

    return (
        <div className={`board-square ${props.color}`} onClick={onClick}>
            <div className={`highlight ${highlight ? 'active' : 'inactive'}`}>
                { piece !== undefined && <Piece piece={piece}/> }
            </div>
        </div>
    );
};
