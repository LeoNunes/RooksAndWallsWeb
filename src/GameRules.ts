import { Dispatch } from 'react';
import {
    GameData,
    availableSquaresForPlacingPiece,
    canMoveTo,
    canPlacePiece,
    getGamePieceById,
    getGamePieceFromPosition,
    getGameWallFromPosition,
    isPlayersTurn,
    possibleDestinations
} from './Data/GameData/Model';
import { GameDataAction, addWallActionCreator, resetNextMoveActionCreator, setNextMovePieceActionCreator, updateFromServerActionCreator } from './Data/GameData/Actions';
import { BoardEventHandlers, BoardData, getBoardPieceFromPosition, getBoardPieceById } from './Data/BoardData/Model';
import { BoardDispatcher } from './Data/BoardData/Actions';
import { ServerData } from './Data/ServerData/Model';
import { ServerAction, addPieceActionCreator, moveActionCreator } from './Data/ServerData/Actions';
import { EdgeCoordinate, SquareCoordinate } from './Data/Common/Coordinates';
import { gameConfig } from './GameConfig';

export function updateGameFromServer(serverData: ServerData, gameDispatch: Dispatch<GameDataAction>) {
    gameDispatch(updateFromServerActionCreator(serverData));
}

export function updateBoardElementsFromGameData(gameData: GameData,
                                                boardDispatcher: BoardDispatcher) {
    boardDispatcher.setPieces(gameData.pieces.map(p => {
        if (p.id === gameData.nextMove.piece?.id) {
            return {
                id: p.id,
                position: gameData.nextMove.piecePosition!!,
                config: gameConfig.pieces[gameConfig.players[p.owner].color].default,
            };
        }
        return {
            id: p.id,
            position: p.position,
            config: gameConfig.pieces[gameConfig.players[p.owner].color].default,
        };
    }).concat(gameData.deadPieces.map(p => {
        return {
            id: p.id,
            position: p.position,
            config: gameConfig.pieces[gameConfig.players[p.owner].color].disabled,
        };
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
        if (!isPlayersTurn(gameState)) {
            return;
        }
        if (!gameState.nextMove.piece) {
            if (boardState.selectedPiece) {
                boardDispatcher.clearPieceSelection();
                boardDispatcher.clearHighlight();
                const gamePiece = getGamePieceById(gameState, boardState.selectedPiece.id);
                if (canMoveTo(gameState, gamePiece, coordinate)) {
                    gameDispatch(setNextMovePieceActionCreator(gamePiece, coordinate));
                }
            }
            else {
                const gamePiece = getGamePieceFromPosition(gameState, coordinate);
                if (gamePiece && gamePiece.owner === gameState.playerId) {
                    boardDispatcher.selectPiece(getBoardPieceById(boardState, gamePiece.id));
                    boardDispatcher.highligh(possibleDestinations(gameState, gamePiece));
                }
            }
        }
    };

    function edgeClicked(coordinate: EdgeCoordinate) {
        if (!isPlayersTurn(gameState)) {
            return;
        }
        if (gameState.nextMove.piece) {
            if (getGameWallFromPosition(gameState, coordinate) === undefined) {
                gameDispatch(resetNextMoveActionCreator());
                serverDispatch(moveActionCreator(gameState.nextMove.piece.id, gameState.nextMove.piecePosition!!, coordinate))
            }
        }
    };

    return {
        squareClicked,
        edgeClicked,
    };
}
