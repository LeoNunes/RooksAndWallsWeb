import { BoardStateAction, HighlighActionType, SelectPieceActionType } from './Actions';
import { BoardStateData } from './Model';

export function BoardStateDataRaducer(data: BoardStateData, action: BoardStateAction): BoardStateData {
    switch (action.type) {
        case 'select-piece': {
            const act = action as SelectPieceActionType;
            return {
                ...data,
                selectedPiece: act.piece,
            };
        }
        case 'highlight': {
            const act = action as HighlighActionType;
            return {
                ...data,
                highlightedSquares: act.squares,
            };
        }
    }
    return data;
}
