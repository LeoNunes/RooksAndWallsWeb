import { GameData } from './Model';
import { GameDataAction, AddWallActionType, MovePieceActionType } from './Actions';

export function gameDataReducer(data: GameData, action: GameDataAction) : GameData {
    switch (action.type) {
        case "add-wall": {
            const act: AddWallActionType = action as AddWallActionType;
            return {
                ...data,
                walls: [
                    ...data.walls,
                    { coordinate: act.position }
                ],
            };
        };
        case "move-piece": {
            const act: MovePieceActionType = action as MovePieceActionType;
            return {
                ...data,
                pieces: [
                    ...data.pieces.filter(p => p !== action.piece),
                    {
                        ...act.piece,
                        coordinate: act.newPosition,
                    }
                ],
            };
        };
    }
};
