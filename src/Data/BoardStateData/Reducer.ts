import { BoardStateAction, HighlighActionType, SelectPieceActionType, SetPiecesActionType, SetWallsActionType } from './Actions';
import { BoardStateData } from './Model';

export function BoardStateDataRaducer(data: BoardStateData, action: BoardStateAction): BoardStateData {
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
    }
}
