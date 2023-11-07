import React from 'react';
import { ChessPieceTypes } from '../../Data/Common/PieceTypes';
import { GameData } from '../../Data/GameData/Model';
import withChessPieces, { PieceData, BoardProps, ComputedBoardProps } from '../../Components/Board/withChessPieces';

export default function addPieces<TBoardProps extends BoardProps>(
    Board: React.FC<ComputedBoardProps<TBoardProps>>,
    gameData: GameData): React.FC<ComputedBoardProps<TBoardProps>> {

    const piecesData: PieceData[] = gameData.pieces.map(piece => ({
        coordinate: piece.position,
        player: piece.owner,
        type: 'rook' as ChessPieceTypes,
    })).concat(gameData.deadPieces.map(piece => ({
        coordinate: piece.position,
        player: piece.owner,
        type: 'rook' as ChessPieceTypes,
        disabled: true,
    })));

    const Component = withChessPieces(Board);
    return function AddPieces(props: ComputedBoardProps<TBoardProps>) {
        return <Component {...props} piecesData={piecesData}/>;
    }
}
