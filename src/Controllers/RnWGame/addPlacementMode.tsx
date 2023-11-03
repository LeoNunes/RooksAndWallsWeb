import React from 'react';
import { SquareCoordinate } from '../../Data/Common/Coordinates';
import { ChessPieceTypes } from '../../Data/Common/PieceTypes';
import { GameData, modelBuilder } from '../../Data/GameData/Model';
import { GameDataAction, addPieceActionCreator } from '../../Data/GameData/Actions';
import withPlacementMode, { RequiredBoardProps } from '../../Components/Board/withPlacementMode';

export default function addPlacementMode<TBoardProps extends RequiredBoardProps>(
    Board: React.FC<TBoardProps>,
    gameData: GameData,
    gameDataDispatch: React.Dispatch<GameDataAction>): React.FC<TBoardProps> {

    const model = modelBuilder(gameData);
    if (gameData.gameStage !== 'piece_placement' || !model.isPlayersTurn()) return Board;
    
    const placeblePiece = {
        player: gameData.playerId,
        type: 'rook' as ChessPieceTypes,
    };

    const placebleCoordinates = model.availableSquaresForPlacingPiece();

    const onPlace = (coord: SquareCoordinate) => {
        gameDataDispatch(addPieceActionCreator(gameData.playerId, coord));
    };

    const Component = withPlacementMode(Board);
    return function(props: TBoardProps) {
        return <Component {...props}
                          placeblePiece={placeblePiece}
                          placebleCoordinates={placebleCoordinates}
                          onPlace={onPlace}/>
    }
}
