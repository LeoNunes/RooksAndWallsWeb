import { EdgeCoordinate, SquareCoordinate } from "../Common/Coordinates";

export type WSAction = {
    addPiece?: AddPieceAction;
    move?: MoveAction;
};

export type AddPieceAction = {
    position: SquareCoordinate;
};

export type MoveAction = {
    pieceId: number;
    position: SquareCoordinate;
    wallPosition: EdgeCoordinate;
};

export function addPieceActionCreator(position: SquareCoordinate): WSAction {
    return {
        addPiece: {
            position: position,
        }
    };
}

export function moveActionCreator(pieceId: number, destination: SquareCoordinate, wallPosition: EdgeCoordinate): WSAction {
    return {
        move: {
            pieceId: pieceId,
            position: destination,
            wallPosition: wallPosition,
        }
    };
}
