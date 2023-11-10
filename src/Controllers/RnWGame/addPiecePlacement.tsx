import React from 'react';
import { SquareCoordinate } from '../../Data/Common/Coordinates';
import { Dispatch } from '../../Data/Common/DataTypes';
import { RnWState, modelBuilder } from '../../Data/RnW/Model';
import { RnWActions } from '../../Data/RnW/Actions';
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
    rnwState: RnWState,
    rnwActions: RnWActions,
    websocketDispatch: Dispatch<ServerAction>,
): React.FC<ComputedBoardProps<SquareCoordinate, TBoardProps>> {
    const model = modelBuilder(rnwState);

    if (model.playerCurrentAction() !== 'add_piece') return Board;

    function placeble(props: React.PropsWithChildren) {
        return (
            <ChessPiece player={rnwState.playerId} type='rook'>
                {props.children}
            </ChessPiece>
        );
    }

    const placebleCoordinates = model.availableSquaresForPlacingPiece();

    function onPlace(coord: SquareCoordinate) {
        rnwActions.addPiece(rnwState.playerId, coord, websocketDispatch);
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
