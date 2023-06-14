export type SquareCoordinate = {
    row: number,
    column: number,
};

export type EdgeCoordinate = {
    square1: SquareCoordinate,
    square2: SquareCoordinate,
};

export function areSquareCoordinatesEqual(c1: SquareCoordinate, c2: SquareCoordinate) {
    return c1.row === c2.row && c1.column === c2.column;
}

export function areEdgeCoordinatesEqual(c1: EdgeCoordinate, c2: EdgeCoordinate) {
    return (areSquareCoordinatesEqual(c1.square1, c2.square1) && areSquareCoordinatesEqual(c1.square2, c2.square2)) ||
           (areSquareCoordinatesEqual(c1.square1, c2.square2) && areSquareCoordinatesEqual(c1.square2, c2.square1));
}
