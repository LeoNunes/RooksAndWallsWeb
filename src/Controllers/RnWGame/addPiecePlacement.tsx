import React from 'react';
import { SquareCoordinate } from '../../Data/Common/Coordinates';
import { AsyncDispatch } from '../../Data/Common/DataTypes';
import { RnWData, modelBuilder } from '../../Data/RnW/Model';
import { RnWAction, addPieceActionCreator } from '../../Data/RnW/Actions';
import withPlacementMode, {
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withPlacementMode';
import ChessPiece from '../../Components/Pieces/ChessPiece';

export default function addPiecePlacement<
    TBoardProps extends BoardProps<SquareCoordinate, 'createSquareContent'>,
>(
    Board: React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>>,
    rnwData: RnWData,
    rnwDataDispatch: AsyncDispatch<RnWAction>,
): React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>> {
    const model = modelBuilder(rnwData);
    if (rnwData.stage !== 'piece_placement' || !model.isPlayersTurn()) return Board;

    function placeble(props: React.PropsWithChildren) {
        return (
            <ChessPiece player={rnwData.playerId} type='rook'>
                {props.children}
            </ChessPiece>
        );
    }

    const placebleCoordinates = model.availableSquaresForPlacingPiece();

    function onPlace(coord: SquareCoordinate) {
        rnwDataDispatch(addPieceActionCreator(rnwData.playerId, coord));
    }

    const Component = withPlacementMode<SquareCoordinate, 'createSquareContent', TBoardProps>(
        Board,
        'createSquareContent',
    );
    return function AddPiecePlacement(props: ComputedBoardProps<SquareCoordinate, TBoardProps>) {
        return (
            <Component
                {...props}
                placeble={placeble}
                placebleCoordinates={placebleCoordinates}
                onPlace={onPlace}
            />
        );
    };
}
