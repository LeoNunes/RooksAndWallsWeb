import React from 'react';
import { SquareCoordinate } from '../../Data/Common/Coordinates';
import { GameData, modelBuilder } from '../../Data/GameData/Model';
import { GameDataAction, addPieceActionCreator } from '../../Data/GameData/Actions';
import withPlacementMode, { BoardProps, ComputedBoardProps } from '../../Components/Board/withPlacementMode';
import ChessPiece from '../../Components/Pieces/ChessPiece';

export default function addPiecePlacement<TBoardProps extends BoardProps<SquareCoordinate, 'createSquareContent'>>(
    Board: React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>>,
    gameData: GameData,
    gameDataDispatch: React.Dispatch<GameDataAction>): React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>> {

    const model = modelBuilder(gameData);
    if (gameData.gameStage !== 'piece_placement' || !model.isPlayersTurn()) return Board;
    
    function placeble(props: React.PropsWithChildren) {
        return (
            <ChessPiece player={gameData.playerId} type='rook'>
                { props.children }
            </ChessPiece>
        );
    }

    const placebleCoordinates = model.availableSquaresForPlacingPiece();

    function onPlace (coord: SquareCoordinate) {
        gameDataDispatch(addPieceActionCreator(gameData.playerId, coord));
    }

    const Component = withPlacementMode<SquareCoordinate, 'createSquareContent', TBoardProps>(Board, 'createSquareContent');
    return function AddPiecePlacement(props: ComputedBoardProps<SquareCoordinate, TBoardProps>) {
        return <Component {...props}
                          placeble={placeble}
                          placebleCoordinates={placebleCoordinates}
                          onPlace={onPlace}/>;
    }
}
