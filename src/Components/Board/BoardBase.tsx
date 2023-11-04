import React, { ReactNode } from 'react';
import { EdgeCoordinate, SquareCoordinate, edgeBelow, edgeToTheRightOf } from '../../Data/Common/Coordinates';
import Square from './Square';
import Edge from './Edge';
import './BoardBase.css';

export type BoardBaseProps = {
    rows: number,
    columns: number,
    haveEdges?: boolean,
    createSquareContent?: (coord: SquareCoordinate) => ReactNode,
    createEdgeContent?: (coord: EdgeCoordinate) => ReactNode,
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
    }

    function createEdge(coordinate: EdgeCoordinate) {
        const { square1: { row: row1, column: column1 }, square2: { row: row2, column: column2 } } = coordinate;
        const orientation = coordinate.square1.row === coordinate.square2.row ? 'vertical' : 'horizontal';
        return (
            <Edge key={`${row1}-${column1}-${row2}-${column2}`}
                  orientation={orientation}>
                { props.createEdgeContent?.(coordinate) }
            </Edge>
        );
    }

    function createCornerSpace(coordinate: SquareCoordinate) {
        return <div key={`corner-${coordinate.row}-${coordinate.column}`} className='board-corner-space'/>;
    }

    function buildRow(row: number) {
        function buildSquareRow() {
            const components: React.ReactNode[] = [];
            for (let column = 0; column < props.columns; column++) {
                const squareCoord = { row, column };
                components.push(createSquare(squareCoord));
                if (props.haveEdges && column !== props.columns - 1) {
                    components.push(createEdge(edgeToTheRightOf(squareCoord)));
                }
            }
            return (
                <div key={`row-${row}`} className='board-row square-row'>
                    { components }
                </div>
            );
        }

        function buildEdgeRow() {
            if (!props.haveEdges || row === props.rows - 1) return undefined;

            const components: React.ReactNode[] = [];
            for (let column = 0; column < props.columns; column++) {
                const squareCoord = { row, column };
                components.push(createEdge(edgeBelow(squareCoord)));
                if (column !== props.columns - 1) {
                    components.push(createCornerSpace(squareCoord));
                }
            }
            return (
                <div key={`edge-row-${row}`} className='board-row edge-row'>
                    { components }
                </div>
            );
        }

        return [buildSquareRow(), buildEdgeRow()];
    }

    const rows = Array.from({ length: props.rows }, (_, i) => i);
    return (
        <div className='board-container'>
            <div className='board-wrapper'>
                <div className='board'>
                    { rows.flatMap(row => buildRow(row)) }
                </div>
            </div>
        </div>
    );
}
