import React from 'react';
import { SquareCoordinate, WallCoordinate } from '../../Data/GameData/Model';
import Square from './Square';
import WallPlaceholder from './WallPlaceholder';
import './Board.css';

type BoardProps = {
    rows: number,
    columns: number,
};
export default function Board(props : BoardProps) {

    const components: React.ReactElement[][] = [];

    for (let r = 0; r < props.rows; r++) {
        let componentsRow: React.ReactElement[] = [];
        
        for (let c = 0; c < props.columns; c++) {
            const squareCoordinate: SquareCoordinate = { row: r, column: c };
            
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
                    <WallPlaceholder key={`${wallCoordinate.square1.row}-${wallCoordinate.square1.column}-${wallCoordinate.square2.row}-${wallCoordinate.square2.column}`}
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
                <WallPlaceholder key={`${wallCoordinate.square1.row}-${wallCoordinate.square1.column}-${wallCoordinate.square2.row}-${wallCoordinate.square2.column}`}
                                 coordinate={wallCoordinate}/>
            );

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
