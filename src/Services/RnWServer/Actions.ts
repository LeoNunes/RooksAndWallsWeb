import type { EdgeCoordinate, SquareCoordinate } from "Domain/Common/Coordinates";
import { apiConfig } from "RnWConfig";
import type { Immutable } from "Util";
import type { CreateGameRequest, CreateGameResponse } from "./Data";

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

type PieceMovementAction = {
    pieceId: number;
    position: SquareCoordinate;
};

type WallPlacementAction = {
    wallPosition: EdgeCoordinate;
};

type MoveAction = {
    pieceMovement: PieceMovementAction | null;
    wallPlacement: WallPlacementAction;
};

export function moveAction(
    wallPosition: EdgeCoordinate,
    pieceMovement?: { pieceId: number; position: SquareCoordinate },
): RnWGameAction {
    return {
        move: {
            pieceMovement: pieceMovement ?? null,
            wallPlacement: { wallPosition },
        },
    };
}

export async function createGame(request: CreateGameRequest): Promise<CreateGameResponse> {
    const response = await fetch(apiConfig.createGame.endpoint(), {
        method: apiConfig.createGame.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Game creation failed");
    }
    const data: CreateGameResponse = await response.json();

    return data;
}
