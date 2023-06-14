import React from 'react';
import { useGameData } from '../../Data/GameData/GameDataProvider';
import { getWallFromPosition } from '../../Data/GameData/Model';
import { EdgeCoordinate } from '../../Data/Common/Coordinates';
import Wall from './Wall';
import './Edge.css';

type EdgeProps = {
    coordinate: EdgeCoordinate,
    clicked?: (coordinate: EdgeCoordinate) => void,
};
export default function Edge({ coordinate, clicked }: EdgeProps) {
    const gameData = useGameData();
    const wall = getWallFromPosition(gameData, coordinate);
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
