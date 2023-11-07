import React from 'react';
import { EdgeCoordinate } from '../../Data/Common/Coordinates';
import { GameData, modelBuilder } from '../../Data/GameData/Model';
import { GameDataAction, addWallActionCreator } from '../../Data/GameData/Actions';
import withPlacementMode, { BoardProps, ComputedBoardProps } from '../../Components/Board/withPlacementMode';
import { Wall } from '../../Components/Pieces/Wall';

export default function addWallPlacement<TBoardProps extends BoardProps<EdgeCoordinate, 'createEdgeContent'>>(
    Board: React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>>,
    gameData: GameData,
    gameDataDispatch: React.Dispatch<GameDataAction>): React.FC<ComputedBoardProps<EdgeCoordinate, TBoardProps>> {

    const model = modelBuilder(gameData);
    if (gameData.gameStage !== 'moves' || !model.isPlayersTurn()) return Board;

    function placeble(props: React.PropsWithChildren) {
        return (
            <Wall>
                { props.children }
            </Wall>
        );
    }

    const placebleCoordinates = model.availableEdgesForPlacingWalls();

    function onPlace(coord: EdgeCoordinate) {
        gameDataDispatch(addWallActionCreator(coord));
    }

    const Component = withPlacementMode<EdgeCoordinate, 'createEdgeContent', TBoardProps>(Board, 'createEdgeContent');
    return function AddWallPlacement(props: ComputedBoardProps<EdgeCoordinate, TBoardProps>) {
        return <Component {...props}
                          placeble={placeble}
                          placebleCoordinates={placebleCoordinates}
                          onPlace={onPlace}/>;
    }
}
