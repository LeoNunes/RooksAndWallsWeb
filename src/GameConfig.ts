import blueRookImage from './resources/img/bluerook.svg';
import greenRookImage from './resources/img/greenrook.svg';
import redRookImage from './resources/img/redrook.svg';
import yellowRookImage from './resources/img/yellowrook.svg'

export type PieceColor = 'blue' | 'green' | 'red' | 'yellow';

export type PieceConfig = {
    uri: string
};

type PlayerConfig = {
    color: PieceColor,
};

type GameConfig = {
    numberOfPlayers: number,
    boardSize: { rows: number, columns: number },
    pieces: Record<PieceColor, { default: PieceConfig, disabled: PieceConfig }>,
    players: { [number: number]: PlayerConfig },
};

export const gameConfig: GameConfig = {
    numberOfPlayers: 3,
    boardSize: {
        rows: 8,
        columns: 8,
    },
    pieces: {
        blue: {
            default: { uri: blueRookImage },
            disabled: { uri: blueRookImage },
        },
        green: {
            default: { uri: greenRookImage },
            disabled: { uri: greenRookImage },
        },
        red: {
            default: { uri: redRookImage },
            disabled: { uri: redRookImage },
        },
        yellow: {
            default: { uri: yellowRookImage },
            disabled: { uri: yellowRookImage },
        },
    },
    players: {
        0: { color: 'blue' },
        1: { color: 'green' },
        2: { color: 'red' },
        3: { color: 'yellow' },
    },
};

// const wsBaseUrl = 'ws://beta.api.rw.leonunes.me';
const wsBaseUrl = 'ws://127.0.0.1:5000';
const wsGamePath = '/rw/game/{gameId}';
export const webSocketConfig = {
    urlForGame: (gameId: number) => `${wsBaseUrl}${wsGamePath.replace('{gameId}', gameId.toString())}`,
}
