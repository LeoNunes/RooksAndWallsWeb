import {
    BoardAction,
    EnablePiecePlacementMode,
    HighlighActionType,
    SelectPieceActionType,
    SetPiecesActionType,
    SetWallsActionType
} from './Actions';
import { BoardData } from './Model';

export function BoardDataRaducer(data: BoardData, action: BoardAction): BoardData {
    switch (action.type) {
        case 'select-piece': {
            const act = action as SelectPieceActionType;
            return {
                ...data,
                selectedPiece: act.piece,
            };
        };
        case 'highlight': {
            const act = action as HighlighActionType;
            return {
                ...data,
                highlightedSquares: act.squares,
            };
        };
        case 'set-pieces': {
            const act = action as SetPiecesActionType;
            return {
                ...data,
                pieces: act.pieces,
            };
        };
        case 'set-walls': {
            const act = action as SetWallsActionType;
            return {
                ...data,
                walls: act.walls,
            };
        };
        case 'enable-piece-placement-mode': {
            const act = action as EnablePiecePlacementMode;
            return {
                ...data,
                piecePlacement: {
                    piece: act.pieceConfig,
                    availableSquares: act.availableSquares
                }
            };
        };
        case 'disable-piece-placement-mode': {
            return {
                ...data,
                piecePlacement: undefined,
            };
        };
    }
}
