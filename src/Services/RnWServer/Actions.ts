import { Immutable } from '../../Util';
import { EdgeCoordinate, SquareCoordinate } from '../../Domain/Common/Coordinates';
import { CreateGameRequest, CreateGameResponse } from './Data';
import { apiConfig } from '../../RnWConfig';

export type RnWGameAction = Immutable<{
    addPiece?: AddPieceAction;
    move?: MoveAction;
}>;

type AddPieceAction = {
    position: SquareCoordinate;
};
export function addPieceAction(position: SquareCoordinate): RnWGameAction {
    return {
        addPiece: {
            position: position,
        },
    };
}

type MoveAction = {
    pieceId: number;
    position: SquareCoordinate;
    wallPosition: EdgeCoordinate;
};
export function moveAction(
    pieceId: number,
    destination: SquareCoordinate,
    wallPosition: EdgeCoordinate,
): RnWGameAction {
    return {
        move: {
            pieceId: pieceId,
            position: destination,
            wallPosition: wallPosition,
        },
    };
}

export async function createGame(request: CreateGameRequest): Promise<CreateGameResponse> {
    const response = await fetch(apiConfig.createGame.endpoint(), {
        method: apiConfig.createGame.method,
    });
    if (!response.ok) {
        throw new Error('Game creation failed');
    }
    const data: CreateGameResponse = await response.json();

    return data;
}
