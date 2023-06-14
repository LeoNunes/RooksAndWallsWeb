import React from 'react';
import { useGameData } from '../../Data/GameData/GameDataProvider';
import { EdgeCoordinate, getWallFromPosition } from '../../Data/GameData/Model';
import Wall from './Wall';
import './Edge.css';

type EdgeProps = {
    coordinate: EdgeCoordinate,
};
export default function Edge({ coordinate }: EdgeProps) {
    const gameData = useGameData();
    const wall = getWallFromPosition(gameData, coordinate);
    const isVertical = coordinate.square1.row === coordinate.square2.row;
    return (
        <div className={`board-edge ${isVertical ? 'vertical' : 'horizontal'}`}>
            { wall !== undefined && <Wall/> }
        </div>
    );
};