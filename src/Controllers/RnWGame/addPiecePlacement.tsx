import React from 'react';
import { SquareCoordinate } from '../../Domain/Common/Coordinates';
import { Dispatch } from '../../Domain/Common/DataTypes';
import { RnWModel } from '../../Domain/RnW/Model';
import { RnWActions } from '../../Domain/RnW/Actions';
import { ServerAction } from '../../Services/RnWServer/Data';
import withPlacementMode, {
    BoardProps,
    ComputedBoardProps,
} from '../../Components/Board/withPlacementMode';
import ChessPiece from '../../Components/Pieces/ChessPiece';

export default function addPiecePlacement<
    TBoardProps extends BoardProps<SquareCoordinate, 'createSquareContent'>,
>(
    Board: React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>>,
    rnwModel: RnWModel,
    rnwActions: RnWActions,
    websocketDispatch: Dispatch<ServerAction>,
): React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>> {
    if (rnwModel.playerCurrentAction() !== 'add_piece') return Board;

    function placeble(props: React.PropsWithChildren) {
        return (
            <ChessPiece player={rnwModel.playerId} type='rook'>
                {props.children}
            </ChessPiece>
        );
    }

    const placebleCoordinates = rnwModel.availableSquaresForPlacingPiece();

    function onPlace(coord: SquareCoordinate) {
        if (!rnwModel.canPlacePiece(coord)) return;

        rnwActions.addPiece(rnwModel.playerId, coord, websocketDispatch);
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
