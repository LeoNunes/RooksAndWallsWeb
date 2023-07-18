import { Dispatch } from 'react';
import { GameData, canMoveTo, getGamePieceById, getGameWallFromPosition, possibleDestinations } from './Data/GameData/Model';
import { GameDataAction, addWallActionCreator, movePieceActionCreator, updateFromServerActionCreator } from './Data/GameData/Actions';
import { BoardEventHandlers, BoardStateData, getBoardPieceFromPosition } from './Data/BoardStateData/Model';
import {
    BoardStateAction,
    clearHighlightActionCreator,
    clearPieceSelectionActionCreator,
    highlighActionCreator,
    selectPieceActionCreator,
    setPiecesActionCreator,
    setWallsActionCreator
} from './Data/BoardStateData/Actions';
import { WSGameState } from './Data/GameWS/Model';
import { WSAction } from './Data/GameWS/Actions';
import { EdgeCoordinate, SquareCoordinate } from './Data/Common/Coordinates';
import { gameConfig } from './GameConfig';

export function updateGameFromWebSocket(gameState: WSGameState, gameDispatch: Dispatch<GameDataAction>) {
    gameDispatch(updateFromServerActionCreator(gameState));
};

export function updateBoardElementsFromGameData(gameState: GameData,
                                                boardDispatch: Dispatch<BoardStateAction>) {
    boardDispatch(setPiecesActionCreator(gameState.pieces.map(p => ({
        id: p.id,
        position: p.position,
        config: gameConfig.pieces[gameConfig.players[p.owner].color].default,
    }))));
    boardDispatch(setWallsActionCreator(gameState.walls.map((w, index) => ({
        id: index,
        position: w.position,
    }))));
};

export function BoardRules(gameState: GameData,
                           boardState: BoardStateData,
                           gameDispatch: Dispatch<GameDataAction>,
                           boardDispatch: Dispatch<BoardStateAction>,
                           serverDispatch: Dispatch<WSAction>) : BoardEventHandlers {
    
    function squareClicked(coordinate: SquareCoordinate) {
        if (boardState.selectedPiece) {
            boardDispatch(clearPieceSelectionActionCreator());
            boardDispatch(clearHighlightActionCreator());
            if (canMoveTo(gameState, getGamePieceById(gameState, boardState.selectedPiece.id), coordinate)) {
                gameDispatch(movePieceActionCreator(getGamePieceById(gameState, boardState.selectedPiece.id), coordinate));
            }
        } else {
            const piece = getBoardPieceFromPosition(boardState, coordinate);
            if (piece) {
                boardDispatch(selectPieceActionCreator(piece));
                boardDispatch(highlighActionCreator(possibleDestinations(gameState, getGamePieceById(gameState, piece.id))));
            }
        }
    };

    function edgeClicked(coordinate: EdgeCoordinate) {
        if (getGameWallFromPosition(gameState, coordinate) === undefined) {
            gameDispatch(addWallActionCreator(coordinate));
        }
    };

    return {
        squareClicked,
        edgeClicked,
    };
};
