import React from 'react';
import { getBoardWallFromPosition } from '../../Data/BoardStateData/Model';
import { useBoardStateData } from '../../Data/BoardStateData/BoardStateDataProvider';
import { EdgeCoordinate } from '../../Data/Common/Coordinates';
import Wall from './Wall';
import './Edge.css';

type EdgeProps = {
    coordinate: EdgeCoordinate,
    clicked?: (coordinate: EdgeCoordinate) => void,
};
export default function Edge({ coordinate, clicked }: EdgeProps) {
    const boardStateData = useBoardStateData();
    const wall = getBoardWallFromPosition(boardStateData, coordinate);
    const isVertical = coordinate.square1.row === coordinate.square2.row;

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (clicked) {
            clicked(coordinate);
        }
    };

    return (
        <div className={`board-edge ${isVertical ? 'vertical' : 'horizontal'}`} onClick={onClick}>
            { wall !== undefined && <Wall/> }
        </div>
    );
};
