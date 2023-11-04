import React from 'react';
import { GameData } from '../../Data/GameData/Model';
import withWalls, { RequiredBoardProps, WallData } from '../../Components/Board/withWalls';

export default function addWalls<TBoardProps extends RequiredBoardProps>(
    Board: React.FC<TBoardProps>,
    gameData: GameData): React.FC<TBoardProps> {

    const wallsData: WallData[] = gameData.walls.map(wall => ({
        coordinate: wall.position,
    }));

    const Component = withWalls(Board);
    return function (props: TBoardProps) {
        return <Component {...props} wallsData={wallsData}/>
    }
}
