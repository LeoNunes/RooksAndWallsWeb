import React from 'react';
import { SquareCoordinate, EdgeCoordinate } from '../../Data/Common/Coordinates';
import { BoardEventHandlers } from '../../Data/BoardStateData/Model';
import Square from './Square';
import Edge from './Edge';
import './Board.css';

type BoardProps = {
    rows: number,
    columns: number,
    eventHandlers: BoardEventHandlers
};
export default function Board(props : BoardProps) {

    function createSquare(coordinate: SquareCoordinate) {
        const { row, column } = coordinate;
        return (
            <Square key={`${row}-${column}`}
                    color={ (row + column) % 2 === 0 ? 'black' : 'white'}
                    coordinate={coordinate}
                    clicked={props.eventHandlers.squareClicked}/>
        );
    };

    function createEdge(coordinate: EdgeCoordinate) {
        const { square1: { row: row1, column: column1 }, square2: { row: row2, column: column2 } } = coordinate;
        return (
            <Edge key={`${row1}-${column1}-${row2}-${column2}`}
                  coordinate={coordinate}
                  clicked={props.eventHandlers.edgeClicked}/>
        );
    }

    const components: React.ReactElement[][] = [];

    for (let r = 0; r < props.rows; r++) {
        let componentsRow: React.ReactElement[] = [];
        
        for (let c = 0; c < props.columns; c++) {
            const squareCoordinate: SquareCoordinate = { row: r, column: c };
            componentsRow.push(createSquare(squareCoordinate));

            if (c !== props.columns - 1) {
                const edgeCoordinate: EdgeCoordinate = {
                    square1: { row: r, column: c },
                    square2: { row: r, column: c + 1 },
                };
                componentsRow.push(createEdge(edgeCoordinate));
            }
        }
        components.push(componentsRow);
        
        if (r === props.rows - 1) {
            continue;
        }

        componentsRow = [];

        for (let c = 0; c < props.columns; c++) {
            const edgeCoordinate: EdgeCoordinate = {
                square1: { row: r, column: c },
                square2: { row: r + 1, column: c}
            };

            componentsRow.push(createEdge(edgeCoordinate));

            if (c !== props.columns - 1) {
                componentsRow.push(
                    <CornerSpace key={`cs-${r}-${c}`}/>
                );
            }
        }

        components.push(componentsRow);
    }

    return (
        <div className='board'>
            {components.map((row, rowIndex) => 
                <div key={`row-${rowIndex}`} className='board-row'>
                    {row}
                </div>
            )}

        </div>
    );
};

function CornerSpace() {
    return (
        <div className='board-corner-space'/>
    );
}
