import { Dispatch } from 'react';
import { GameData, canMoveTo, getPieceFromPosition, possibleDestinations } from './Data/GameData/Model';
import { GameDataAction, addWallActionCreator, movePieceActionCreator } from './Data/GameData/Actions';
import { BoardEventHandlers, BoardStateData } from './Data/BoardStateData/Model';
import {
    BoardStateAction,
    clearHighlightActionCreator,
    clearPieceSelectionActionCreator,
    highlighActionCreator,
    selectPieceActionCreator
} from './Data/BoardStateData/Actions';
import { EdgeCoordinate, SquareCoordinate } from './Data/Common/Coordinates';

export function BoardRules(gameState: GameData,
                           boardState: BoardStateData,
                           gameDispatch: Dispatch<GameDataAction>,
                           boardDispatch: Dispatch<BoardStateAction>) : BoardEventHandlers {
    
    function squareClicked(coordinate: SquareCoordinate) {
        if (boardState.selectedPiece) {
            boardDispatch(clearPieceSelectionActionCreator());
            boardDispatch(clearHighlightActionCreator());
            if (canMoveTo(gameState, boardState.selectedPiece, coordinate)) {
                gameDispatch(movePieceActionCreator(boardState.selectedPiece, coordinate));
            }
        } else {
            const piece = getPieceFromPosition(gameState, coordinate);
            if (piece) {
                boardDispatch(selectPieceActionCreator(piece));
                boardDispatch(highlighActionCreator(possibleDestinations(gameState, piece)));
            }
        }
    }

    function edgeClicked(coordinate: EdgeCoordinate) {
        gameDispatch(addWallActionCreator(coordinate));
    };

    return {
        squareClicked,
        edgeClicked,
    };
};

export function WebSocketRules() {};
