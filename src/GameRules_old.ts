import { Dispatch } from 'react';
import {
    RnWState,
    availableSquaresForPlacingPiece,
    canMoveTo,
    canPlacePiece,
    getPieceById,
    getPieceFromPosition,
    getWallFromPosition,
    isPlayersTurn,
    possibleDestinations,
} from './Data/RnW/Model';
import {
    RnWAction,
    addWallActionCreator,
    resetNextMoveActionCreator,
    setNextMovePieceActionCreator,
    updateFromServerActionCreator,
} from './Data/RnW/Actions';
import {
    BoardEventHandlers,
    BoardData,
    getBoardPieceFromPosition,
    getBoardPieceById,
} from './Data/BoardData/Model';
import { BoardDispatcher } from './Data/BoardData/Actions';
import { ServerState, ServerAction, addPieceAction, moveAction } from './Services/RnWServer/Data';
import { EdgeCoordinate, SquareCoordinate } from './Data/Common/Coordinates';
import { rnwConfig } from './RnWConfig';

export function updateGameFromServer(serverData: ServerState, gameDispatch: Dispatch<RnWAction>) {
    gameDispatch(updateFromServerActionCreator(serverData));
}

export function updateBoardElementsFromGameData(
    gameData: RnWState,
    boardDispatcher: BoardDispatcher,
) {
    boardDispatcher.setPieces(
        gameData.pieces
            .map(p => {
                if (p.id === gameData.nextMove.piece?.id) {
                    return {
                        id: p.id,
                        position: gameData.nextMove.piecePosition!!,
                        config: rnwConfig.pieces[rnwConfig.players[p.owner].color].default,
                    };
                }
                return {
                    id: p.id,
                    position: p.position,
                    config: rnwConfig.pieces[rnwConfig.players[p.owner].color].default,
                };
            })
            .concat(
                gameData.deadPieces.map(p => {
                    return {
                        id: p.id,
                        position: p.position,
                        config: rnwConfig.pieces[rnwConfig.players[p.owner].color].disabled,
                    };
                }),
            ),
    );
    boardDispatcher.setWalls(
        gameData.walls.map((w, index) => ({
            id: index,
            position: w.position,
        })),
    );

    if (isPlayersTurn(gameData)) {
        if (gameData.stage === 'piece_placement') {
            boardDispatcher.enablePiecePlacementMode(
                rnwConfig.pieces[rnwConfig.players[gameData.playerId].color].default,
                availableSquaresForPlacingPiece(gameData),
            );
        }
    } else {
        boardDispatcher.disablePiecePlacementMode();
    }
}

export function boardRules(
    gameState: RnWState,
    boardState: BoardData,
    gameDispatch: Dispatch<RnWAction>,
    boardDispatcher: BoardDispatcher,
    serverDispatch: Dispatch<ServerAction>,
): BoardEventHandlers {
    switch (gameState.stage) {
        case 'waiting_for_players':
            return {};
        case 'piece_placement':
            return boardRulesForPiecePlacementStage(
                gameState,
                boardState,
                gameDispatch,
                boardDispatcher,
                serverDispatch,
            );
        case 'moves':
            return boardRulesForMovesStage(
                gameState,
                boardState,
                gameDispatch,
                boardDispatcher,
                serverDispatch,
            );
        case 'completed':
            return {};
    }
}

function boardRulesForPiecePlacementStage(
    gameState: RnWState,
    boardState: BoardData,
    gameDispatch: Dispatch<RnWAction>,
    boardDispatcher: BoardDispatcher,
    serverDispatch: Dispatch<ServerAction>,
): BoardEventHandlers {
    function squareClicked(coordinate: SquareCoordinate) {
        if (!isPlayersTurn(gameState)) {
            return;
        }

        if (canPlacePiece(gameState, coordinate)) {
            serverDispatch(addPieceAction(coordinate));
        }
    }

    return {
        squareClicked,
    };
}

function boardRulesForMovesStage(
    gameState: RnWState,
    boardState: BoardData,
    gameDispatch: Dispatch<RnWAction>,
    boardDispatcher: BoardDispatcher,
    serverDispatch: Dispatch<ServerAction>,
): BoardEventHandlers {
    function squareClicked(coordinate: SquareCoordinate) {
        if (!isPlayersTurn(gameState)) {
            return;
        }
        if (!gameState.nextMove.piece) {
            if (boardState.selectedPiece) {
                boardDispatcher.clearPieceSelection();
                boardDispatcher.clearHighlight();
                const gamePiece = getPieceById(gameState, boardState.selectedPiece.id);
                if (canMoveTo(gameState, gamePiece, coordinate)) {
                    gameDispatch(setNextMovePieceActionCreator(gamePiece, coordinate));
                }
            } else {
                const gamePiece = getPieceFromPosition(gameState, coordinate);
                if (gamePiece && gamePiece.owner === gameState.playerId) {
                    boardDispatcher.selectPiece(getBoardPieceById(boardState, gamePiece.id));
                    boardDispatcher.highligh(possibleDestinations(gameState, gamePiece));
                }
            }
        }
    }

    function edgeClicked(coordinate: EdgeCoordinate) {
        if (!isPlayersTurn(gameState)) {
            return;
        }
        if (gameState.nextMove.piece) {
            if (getWallFromPosition(gameState, coordinate) === undefined) {
                gameDispatch(resetNextMoveActionCreator());
                serverDispatch(
                    moveAction(
                        gameState.nextMove.piece.id,
                        gameState.nextMove.piecePosition!!,
                        coordinate,
                    ),
                );
            }
        }
    }

    return {
        squareClicked,
        edgeClicked,
    };
}
