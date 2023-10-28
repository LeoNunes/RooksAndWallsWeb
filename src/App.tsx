import React, { useState } from 'react';
// import Game from './Game';
import { SquareCoordinate, areSquareCoordinatesEqual } from './Data/Common/Coordinates';
import { ChessPieceTypes } from './Data/Common/PieceTypes';
import { GameDataProvider } from './Data/GameData/GameDataProvider';
import { BoardDataProvider } from './Data/BoardData/BoardDataProvider';
import BoardBase from './Components/Board/BoardBase';
import withChessPieces from './Components/Board/withChessPieces';
import withClickMovement from './Components/Board/withClickMovement';
import withPlacementMode from './Components/Board/withPlacementMode';
import './App.css';

let initialData = {
    pieces: [{
        coordinate: { row: 0, column: 4 },
        player: 0,
        type: 'rook' as ChessPieceTypes,
        disabled: false,
    },
    {
        coordinate: { row: 2, column: 5 },
        player: 3,
        type: 'rook' as ChessPieceTypes,
        disabled: false,
    }],
};

function move(data: typeof initialData, from: SquareCoordinate, to: SquareCoordinate): typeof initialData {
    return {
        ...data,
        pieces: [
            ...data.pieces.filter(p => !areSquareCoordinatesEqual(p.coordinate, from)),
            {
                ...data.pieces.find(p => areSquareCoordinatesEqual(p.coordinate, from))!!,
                coordinate: to,
            }
        ]
    }
}

function add(data: typeof initialData, coord: SquareCoordinate): typeof initialData {
    return {
        ...data,
        pieces: [
            ...data.pieces,
            {
                coordinate: coord,
                player: 0,
                type: 'rook' as ChessPieceTypes,
                disabled: false,
            }
        ]
    }
}

function App() {
    // eslint-disable-next-line
    const gameId = Number(Object.fromEntries(new URLSearchParams(window.location.search))['gameId']) || 0;

    const [data, setData] = useState(initialData);

    const Board = withPlacementMode(withChessPieces(withClickMovement(BoardBase)));

    return (
        <div className="App">
            <GameDataProvider>
                <BoardDataProvider>
                    {/* <Game gameId={gameId}/> */}
                    <Board rows={8}
                           columns={8}
                           placebleCoordinates={[{row: 5 , column: 5}, {row: 5, column: 6}]}
                           placeblePiece={{ player: 0, type: 'rook' }}
                           onPlace={c => setData(add(data, c))}
                           piecesData={data.pieces}
                           moveblePositions={data.pieces.map(p => p.coordinate)}
                           destinationsFrom={c =>  ([{row: 0 , column: 0}, {row: 1, column: 0}])}
                           onMove={(from, to) => setData(move(data, from, to))}/>
                </BoardDataProvider>
            </GameDataProvider>
        </div>
    );
}

export default App;
