export type SquareCoordinate = {
    row: number;
    column: number;
};

export type EdgeCoordinate = {
    square1: SquareCoordinate;
    square2: SquareCoordinate;
};

export type Coordinate = SquareCoordinate | EdgeCoordinate;

export function isSquareCoordinate(coord: any): coord is SquareCoordinate {
    return (
        typeof (coord as SquareCoordinate).row === 'number' &&
        typeof (coord as SquareCoordinate).column === 'number'
    );
}

export function isEdgeCoordinate(coord: any): coord is EdgeCoordinate {
    return (
        typeof (coord as EdgeCoordinate).square1 === 'object' &&
        typeof (coord as EdgeCoordinate).square2 === 'object' &&
        isSquareCoordinate((coord as EdgeCoordinate).square1) &&
        isSquareCoordinate((coord as EdgeCoordinate).square2)
    );
}

export function areSquareCoordinatesEqual(c1: SquareCoordinate, c2: SquareCoordinate): boolean {
    return c1.row === c2.row && c1.column === c2.column;
}

export function areEdgeCoordinatesEqual(c1: EdgeCoordinate, c2: EdgeCoordinate): boolean {
    return (
        (areSquareCoordinatesEqual(c1.square1, c2.square1) &&
            areSquareCoordinatesEqual(c1.square2, c2.square2)) ||
        (areSquareCoordinatesEqual(c1.square1, c2.square2) &&
            areSquareCoordinatesEqual(c1.square2, c2.square1))
    );
}

export function areCoordinatesEqual(c1: Coordinate, c2: Coordinate): boolean {
    if (isSquareCoordinate(c1) && isSquareCoordinate(c2)) {
        return areSquareCoordinatesEqual(c1, c2);
    }
    if (isEdgeCoordinate(c1) && isEdgeCoordinate(c2)) {
        return areEdgeCoordinatesEqual(c1, c2);
    }
    return false;
}

export function edgeToTheRightOf(squareCoord: SquareCoordinate): EdgeCoordinate {
    return {
        square1: squareCoord,
        square2: { row: squareCoord.row, column: squareCoord.column + 1 },
    };
}

export function edgeBelow(squareCoord: SquareCoordinate): EdgeCoordinate {
    return {
        square1: squareCoord,
        square2: { row: squareCoord.row + 1, column: squareCoord.column },
    };
}
