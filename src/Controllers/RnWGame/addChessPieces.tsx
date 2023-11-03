import React from 'react';
import { ChessPieceTypes } from '../../Data/Common/PieceTypes';
import { GameData } from '../../Data/GameData/Model';
import withChessPieces, { PieceData, RequiredBoardProps } from '../../Components/Board/withChessPieces';

export default function addChessPieces<TBoardProps extends RequiredBoardProps>(
    Board: React.FC<TBoardProps>,
    gameData: GameData): React.FC<TBoardProps> {

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
    return function (props: TBoardProps) {
        return <Component {...props} piecesData={piecesData}/>
    }
}
