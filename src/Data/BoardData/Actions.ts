import { BoardPiece, BoardWall } from './Model';
import { SquareCoordinate } from '../Common/Coordinates';
import { PieceConfig } from '../../RnWConfig';
import { Dispatch } from 'react';

export type BoardDispatcher = ReturnType<typeof boardDispatcher>;
export function boardDispatcher(dispatch: Dispatch<BoardAction>) {
    return {
        selectPiece: (piece: BoardPiece) => dispatch(selectPieceActionCreator(piece)),
        clearPieceSelection: () => dispatch(clearPieceSelectionActionCreator()),
        highligh: (squares: SquareCoordinate[]) => dispatch(highlighActionCreator(squares)),
        clearHighlight: () => dispatch(clearHighlightActionCreator()),
        setPieces: (pieces: BoardPiece[]) => dispatch(setPiecesActionCreator(pieces)),
        setWalls: (walls: BoardWall[]) => dispatch(setWallsActionCreator(walls)),
        enablePiecePlacementMode: (
            pieceConfig: PieceConfig,
            availableSquares: SquareCoordinate[],
        ) => dispatch(enablePiecePlacementModeActionCreator(pieceConfig, availableSquares)),
        disablePiecePlacementMode: () => dispatch(disablePiecePlacementModeActionCreator()),
    };
}

export type BoardAction =
    | HighlighActionType
    | SelectPieceActionType
    | SetPiecesActionType
    | SetWallsActionType
    | EnablePiecePlacementMode
    | DisablePiecePlacementMode;

export type SelectPieceActionType = {
    type: 'select-piece';
    piece?: BoardPiece;
};
export function selectPieceActionCreator(piece: BoardPiece): SelectPieceActionType {
    return {
        type: 'select-piece',
        piece: piece,
    };
}
export function clearPieceSelectionActionCreator(): SelectPieceActionType {
    return {
        type: 'select-piece',
        piece: undefined,
    };
}

export type HighlighActionType = {
    type: 'highlight';
    squares: SquareCoordinate[];
};
export function highlighActionCreator(squares: SquareCoordinate[]): HighlighActionType {
    return {
        type: 'highlight',
        squares: squares,
    };
}
export function clearHighlightActionCreator(): HighlighActionType {
    return {
        type: 'highlight',
        squares: [],
    };
}

export type SetPiecesActionType = {
    type: 'set-pieces';
    pieces: BoardPiece[];
};
export function setPiecesActionCreator(pieces: BoardPiece[]): SetPiecesActionType {
    return {
        type: 'set-pieces',
        pieces: pieces,
    };
}

export type SetWallsActionType = {
    type: 'set-walls';
    walls: BoardWall[];
};
export function setWallsActionCreator(walls: BoardWall[]): SetWallsActionType {
    return {
        type: 'set-walls',
        walls: walls,
    };
}

export type EnablePiecePlacementMode = {
    type: 'enable-piece-placement-mode';
    pieceConfig: PieceConfig;
    availableSquares: SquareCoordinate[];
};
export function enablePiecePlacementModeActionCreator(
    pieceConfig: PieceConfig,
    availableSquares: SquareCoordinate[],
): EnablePiecePlacementMode {
    return {
        type: 'enable-piece-placement-mode',
        pieceConfig: pieceConfig,
        availableSquares: availableSquares,
    };
}

export type DisablePiecePlacementMode = {
    type: 'disable-piece-placement-mode';
};
export function disablePiecePlacementModeActionCreator(): DisablePiecePlacementMode {
    return {
        type: 'disable-piece-placement-mode',
    };
}
