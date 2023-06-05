import React from 'react';
import './Board.css';

type PieceData = {};
type WallData = {};

type BoardProps = {
    rows: number,
    columns: number,
    pieces?: PieceData[],
    walls?: WallData[],
};

type SquareCoordinate = {
    row: number,
    column: number,
};

type WallCoordinate = {
    square1: SquareCoordinate,
    square2: SquareCoordinate,
};

type SquareProps = {
    piece?: PieceData,
    color: 'black' | 'white',
    coordinate: SquareCoordinate,
};

type WallProps = {
    wall?: WallData,
    coordinate: WallCoordinate,
};

export default function Board(props : BoardProps) {

    const components: React.ReactElement[][] = [];

    for (let r = 0; r < props.rows; r++) {
        let componentsRow: React.ReactElement[] = [];
        
        for (let c = 0; c < props.columns; c++) {
            const squareCoordinate: SquareCoordinate = {row: r, column: c};
            
            componentsRow.push(
                <Square key={`${r}-${c}`}
                        color={ (r + c) % 2 === 0 ? 'black' : 'white'}
                        coordinate={squareCoordinate}/>
            );

            if (c !== props.columns - 1) {
                const wallCoordinate: WallCoordinate = {
                    square1: { row: r, column: c },
                    square2: { row: r, column: c + 1 },
                };
                componentsRow.push(
                    <Wall key={`${wallCoordinate.square1.row}-${wallCoordinate.square1.column}-${wallCoordinate.square2.row}-${wallCoordinate.square2.column}`}
                          coordinate={wallCoordinate} />
                );
            }
        }
        components.push(componentsRow);
        
        if (r === props.rows - 1) {
            continue;
        }

        componentsRow = [];

        for (let c = 0; c < props.columns; c++) {
            const wallCoordinate: WallCoordinate = {
                square1: { row: r, column: c },
                square2: { row: r + 1, column: c}
            };

            componentsRow.push(
                <Wall coordinate={wallCoordinate}/>
            );

            if (c !== props.columns - 1) {
                componentsRow.push(
                    <CornerSpace/>
                );
            }
        }

        components.push(componentsRow);
    }

    return (
        <div className='board'>
            {components.map(row => 
                <div className='board-row'>
                    {row}
                </div>
            )}

        </div>
    );
};

function Square(props: SquareProps) {
    return (
        <div className={`board-square ${props.color}`}>

        </div>
    );
};

function Wall(props: WallProps) {
    const isVertical = props.coordinate.square1.row === props.coordinate.square2.row;
    return (
        <div className={`board-wall ${isVertical ? 'vertical' : 'horizontal'}`}>

        </div>
    );
};

function CornerSpace() {
    return (
        <div className='board-corner-space'/>
    );
}