import { Dispatch } from 'react';
import {
    GameData,
    availableSquaresForPlacingPiece,
    canMoveTo,
    canPlacePiece,
    getGamePieceById,
    getGameWallFromPosition,
    isPlayersTurn,
    possibleDestinations
} from './Data/GameData/Model';
import { GameDataAction, addWallActionCreator, movePieceActionCreator, updateFromServerActionCreator } from './Data/GameData/Actions';
import { BoardEventHandlers, BoardData, getBoardPieceFromPosition } from './Data/BoardData/Model';
import { BoardDispatcher } from './Data/BoardData/Actions';
import { ServerData } from './Data/ServerData/Model';
import { ServerAction, addPieceActionCreator } from './Data/ServerData/Actions';
import { EdgeCoordinate, SquareCoordinate } from './Data/Common/Coordinates';
import { gameConfig } from './GameConfig';

export function updateGameFromServer(serverData: ServerData, gameDispatch: Dispatch<GameDataAction>) {
    gameDispatch(updateFromServerActionCreator(serverData));
}

export function updateBoardElementsFromGameData(gameData: GameData,
                                                boardDispatcher: BoardDispatcher) {
    boardDispatcher.setPieces(gameData.pieces.map(p => ({
        id: p.id,
        position: p.position,
        config: gameConfig.pieces[gameConfig.players[p.owner].color].default,
    })));
    boardDispatcher.setWalls(gameData.walls.map((w, index) => ({
        id: index,
        position: w.position,
    })));

    if (isPlayersTurn(gameData)) {
        if (gameData.gameStage === 'piece_placement') {
            boardDispatcher.enablePiecePlacementMode(
                gameConfig.pieces[gameConfig.players[gameData.playerId].color].default,
                availableSquaresForPlacingPiece(gameData),
                );
            }
        }
    else {
        boardDispatcher.disablePiecePlacementMode();
    }
}

export function boardRules(gameState: GameData,
                           boardState: BoardData,
                           gameDispatch: Dispatch<GameDataAction>,
                           boardDispatcher: BoardDispatcher,
                           serverDispatch: Dispatch<ServerAction>): BoardEventHandlers {
    
    switch (gameState.gameStage) {
        case 'waiting_for_players': return {};
        case 'piece_placement': return boardRulesForPiecePlacementStage(gameState, boardState, gameDispatch, boardDispatcher, serverDispatch);
        case 'moves': return boardRulesForMovesStage(gameState, boardState, gameDispatch, boardDispatcher, serverDispatch);
        case 'completed': return {};
    }
}

function boardRulesForPiecePlacementStage(gameState: GameData,
                                          boardState: BoardData,
                                          gameDispatch: Dispatch<GameDataAction>,
                                          boardDispatcher: BoardDispatcher,
                                          serverDispatch: Dispatch<ServerAction>): BoardEventHandlers {
    
    function squareClicked(coordinate: SquareCoordinate) {
        if (!isPlayersTurn(gameState)) {
            return;
        }

        if (canPlacePiece(gameState, coordinate)) {
            serverDispatch(addPieceActionCreator(coordinate));
        }
    }

    return {
        squareClicked,
    };
}

function boardRulesForMovesStage(gameState: GameData,
                                 boardState: BoardData,
                                 gameDispatch: Dispatch<GameDataAction>,
                                 boardDispatcher: BoardDispatcher,
                                 serverDispatch: Dispatch<ServerAction>): BoardEventHandlers {

    function squareClicked(coordinate: SquareCoordinate) {
        if (boardState.selectedPiece) {
            boardDispatcher.clearPieceSelection();
            boardDispatcher.clearHighlight();
            if (canMoveTo(gameState, getGamePieceById(gameState, boardState.selectedPiece.id), coordinate)) {
                gameDispatch(movePieceActionCreator(getGamePieceById(gameState, boardState.selectedPiece.id), coordinate));
            }
        }
        else {
            const piece = getBoardPieceFromPosition(boardState, coordinate);
            if (piece) {
                boardDispatcher.selectPiece(piece);
                boardDispatcher.highligh(possibleDestinations(gameState, getGamePieceById(gameState, piece.id)));
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
}
