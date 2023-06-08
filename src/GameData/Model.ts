export type SquareCoordinate = {
    row: number,
    column: number,
};

export type WallCoordinate = {
    square1: SquareCoordinate,
    square2: SquareCoordinate,
};

export type Piece = {
    owner: number,
    coordinate: SquareCoordinate,
}

export type Wall = {
    coordinate: WallCoordinate,
};

export type GameData = {
    pieces: Piece[],
    walls: Wall[],
};

export const gameDataInitialValue: GameData = {
    pieces: [
        {
            owner: 0,
            coordinate: { row: 0, column: 0 }
        },
        {
            owner: 1,
            coordinate: { row: 7, column: 7 }
        }
    ],
    walls: [
        {
            coordinate: {
                square1: { row: 0, column: 0 },
                square2: { row: 0, column: 1 }
            }
        },
        {
            coordinate: {
                square1: { row: 5, column: 5 },
                square2: { row: 6, column: 5 }
            }
        }
    ],
};

export function getPieceFromPosition(data: GameData, position: SquareCoordinate) {
    return data.pieces.find(p => areSquareCoordinatesEqual(p.coordinate, position));
}

export function getWallFromPosition(data: GameData, position: WallCoordinate) {
    return data.walls.find(w => areWallCoordinatesEqual(w.coordinate, position));
}

export function areSquareCoordinatesEqual(c1: SquareCoordinate, c2: SquareCoordinate) {
    return c1.row === c2.row && c1.column === c2.column;
}

export function areWallCoordinatesEqual(c1: WallCoordinate, c2: WallCoordinate) {
    return (areSquareCoordinatesEqual(c1.square1, c2.square1) && areSquareCoordinatesEqual(c1.square2, c2.square2)) ||
           (areSquareCoordinatesEqual(c1.square1, c2.square2) && areSquareCoordinatesEqual(c1.square2, c2.square1));
}