import React, { ReactNode } from 'react';
import { SquareCoordinate } from '../../Data/Common/Coordinates';
import Square from './Square';
import './BoardBase.css';

export type BoardBaseProps = {
    rows: number,
    columns: number,
    createSquareContent?: (coord: SquareCoordinate) => ReactNode,
};
export default function BoardBase(props: BoardBaseProps) {

    function createSquare(coordinate: SquareCoordinate) {
        const { row, column } = coordinate;
        return (
            <Square key={`${row}-${column}`}
                    color={ (row + column) % 2 === 0 ? 'black' : 'white'}>
                { props.createSquareContent?.(coordinate) }
            </Square>
        );
    };

    const coordinates: SquareCoordinate[][] = [];
    for (let r = 0; r < props.rows; r++) {
        coordinates[r] = []
        for (let c = 0; c < props.columns; c++) {
            coordinates[r][c] = { row: r, column: c };
        }
    }

    return (
        <div className='board'>
            {
                coordinates.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className='board-row'>
                        { row.map(coord => createSquare(coord)) }
                    </div>
                ))
            }
        </div>
    );
}