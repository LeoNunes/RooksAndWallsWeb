import React from 'react';
import { GameData } from '../../Data/GameData/Model';
import withWalls, { BoardProps, ComputedBoardProps, WallData } from '../../Components/Board/withWalls';

export default function addWalls<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    gameData: GameData): React.FC<ComputedBoardProps<TBoardProps>> {

    const wallsData: WallData[] = gameData.walls.map(wall => ({
        coordinate: wall.position,
    }));

    const Component = withWalls(Board);
    return function AddWalls(props: ComputedBoardProps<TBoardProps>) {
        return <Component {...props} wallsData={wallsData}/>;
    }
}
