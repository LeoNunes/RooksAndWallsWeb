import React from 'react';
import { useGameData } from '../../Data/GameData/GameDataProvider';
import { WallCoordinate, getWallFromPosition } from '../../Data/GameData/Model';
import './Wall.css';

type WallProps = {
    coordinate: WallCoordinate,
};
export default function Wall({ coordinate }: WallProps) {
    const gameData = useGameData();
    const wall = getWallFromPosition(gameData, coordinate);
    const isVertical = coordinate.square1.row === coordinate.square2.row;
    return (
        <div className={`board-wall ${isVertical ? 'vertical' : 'horizontal'} ${wall !== undefined ? `filled` : ''} `}>

        </div>
    );
};