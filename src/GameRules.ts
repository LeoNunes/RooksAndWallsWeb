import { Dispatch } from 'react';
import { GameData, canMoveTo, getGamePieceById, getGameWallFromPosition, possibleDestinations } from './Data/GameData/Model';
import { GameDataAction, addWallActionCreator, movePieceActionCreator, updateFromServerActionCreator } from './Data/GameData/Actions';
import { BoardEventHandlers, BoardData, getBoardPieceFromPosition } from './Data/BoardData/Model';
import {
    BoardAction,
    clearHighlightActionCreator,
    clearPieceSelectionActionCreator,
    highlighActionCreator,
    selectPieceActionCreator,
    setPiecesActionCreator,
    setWallsActionCreator
} from './Data/BoardData/Actions';
import { ServerGameState } from './Data/ServerData/Model';
import { ServerAction } from './Data/ServerData/Actions';
import { EdgeCoordinate, SquareCoordinate } from './Data/Common/Coordinates';
import { gameConfig } from './GameConfig';

export function updateGameFromWebSocket(gameState: ServerGameState, gameDispatch: Dispatch<GameDataAction>) {
    gameDispatch(updateFromServerActionCreator(gameState));
};

export function updateBoardElementsFromGameData(gameState: GameData,
                                                boardDispatch: Dispatch<BoardAction>) {
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
                           boardState: BoardData,
                           gameDispatch: Dispatch<GameDataAction>,
                           boardDispatch: Dispatch<BoardAction>,
                           serverDispatch: Dispatch<ServerAction>) : BoardEventHandlers {
    
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
