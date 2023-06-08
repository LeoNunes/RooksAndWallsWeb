import React from 'react';
import {
    Piece as PieceData,
    SquareCoordinate,
    WallCoordinate,
    getPieceFromPosition,
    getWallFromPosition
} from './GameData/Model';
import { useGameData } from './GameData/GameDataProvider';
import blueRookImage from './img/bluerook.svg';
import greenRookImage from './img/greenrook.svg';
import redRookImage from './img/redrook.svg';
import yellowRookImage from './img/yellowrook.svg'
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
                <Wall key={`${wallCoordinate.square1.row}-${wallCoordinate.square1.column}-${wallCoordinate.square2.row}-${wallCoordinate.square2.column}`}
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

type SquareProps = {
    color: 'black' | 'white',
    coordinate: SquareCoordinate,
};
function Square({ color, coordinate }: SquareProps) {
    const gameData = useGameData();
    const piece = getPieceFromPosition(gameData, coordinate);

    return (
        <div className={`board-square ${color}`}>
            { piece !== undefined && <Piece piece={piece}/> }
        </div>
    );
};

type WallProps = {
    coordinate: WallCoordinate,
};
function Wall({ coordinate }: WallProps) {
    const gameData = useGameData();
    const wall = getWallFromPosition(gameData, coordinate);
    const isVertical = coordinate.square1.row === coordinate.square2.row;
    return (
        <div className={`board-wall ${isVertical ? 'vertical' : 'horizontal'} ${wall !== undefined ? `filled` : ''} `}>

        </div>
    );
};

function CornerSpace() {
    return (
        <div className='board-corner-space'/>
    );
}

const rookImages = [ blueRookImage, yellowRookImage, redRookImage, greenRookImage ];
type PieceProps = {
    piece: PieceData,
};
function Piece({ piece }: PieceProps) {

    return (
        <div className='piece'
             style={{ backgroundImage: `url(${rookImages[piece.owner]})` }}/>
    );
};