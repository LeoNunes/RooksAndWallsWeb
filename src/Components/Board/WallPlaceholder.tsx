import React from 'react';
import { useGameData } from '../../Data/GameData/GameDataProvider';
import { WallCoordinate, getWallFromPosition } from '../../Data/GameData/Model';
import Wall from './Wall';
import './WallPlaceholder.css';

type WallProps = {
    coordinate: WallCoordinate,
};
export default function WallPlaceholder({ coordinate }: WallProps) {
    const gameData = useGameData();
    const wall = getWallFromPosition(gameData, coordinate);
    const isVertical = coordinate.square1.row === coordinate.square2.row;
    return (
        <div className={`board-wall ${isVertical ? 'vertical' : 'horizontal'}`}>
            { wall !== undefined && <Wall/> }
        </div>
    );
};