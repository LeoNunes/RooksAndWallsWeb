import blueRookImage from "./resources/img/bluerook.svg";
import blueRookDisabledImage from "./resources/img/bluerookdisabled.svg";
import greenRookImage from "./resources/img/greenrook.svg";
import greenRookDisabledImage from "./resources/img/greenrookdisabled.svg";
import redRookImage from "./resources/img/redrook.svg";
import redRookDisabledImage from "./resources/img/redrookdisabled.svg";
import yellowRookImage from "./resources/img/yellowrook.svg";
import yellowRookDisabledImage from "./resources/img/yellowrookdisabled.svg";

export type PieceColor = "blue" | "green" | "red" | "yellow";

export type PieceConfig = {
    uri: string;
};

type PlayerConfig = {
    color: PieceColor;
};

type RnWConfig = {
    maxNumberOfPlayers: number;
    minNumberOfPlayers: number;
    defaultNumberOfPlayers: number;
    maxPiecesPerPlayer: number;
    minPiecesPerPlayer: number;
    defaultPiecesPerPlayer: number;
    boardSize: { rows: number; columns: number };
    pieces: Record<PieceColor, { default: PieceConfig; disabled: PieceConfig }>;
    players: { [number: number]: PlayerConfig };
};

export const rnwConfig: RnWConfig = {
    maxNumberOfPlayers: 4,
    minNumberOfPlayers: 2,
    defaultNumberOfPlayers: 3,
    maxPiecesPerPlayer: 5,
    minPiecesPerPlayer: 1,
    defaultPiecesPerPlayer: 3,
    boardSize: {
        rows: 8,
        columns: 8,
    },
    pieces: {
        blue: {
            default: { uri: blueRookImage },
            disabled: { uri: blueRookDisabledImage },
        },
        green: {
            default: { uri: greenRookImage },
            disabled: { uri: greenRookDisabledImage },
        },
        red: {
            default: { uri: redRookImage },
            disabled: { uri: redRookDisabledImage },
        },
        yellow: {
            default: { uri: yellowRookImage },
            disabled: { uri: yellowRookDisabledImage },
        },
    },
    players: {
        0: { color: "blue" },
        1: { color: "green" },
        2: { color: "red" },
        3: { color: "yellow" },
    },
};

const apiBaseUrl = "https://beta.api.rw.leonunes.me";
// const apiBaseUrl = 'http://127.0.0.1:5000';
const apiPrefix = "/rw";
export const apiConfig = {
    createGame: {
        endpoint: () => `${apiBaseUrl}${apiPrefix}/game`,
        method: "POST",
    },
};

const wsBaseUrl = "wss://beta.api.rw.leonunes.me";
// const wsBaseUrl = 'ws://127.0.0.1:5000';
const wsGamePath = "/rw/game/{gameId}";
export const webSocketConfig = {
    urlForGame: (gameId: number) => `${wsBaseUrl}${wsGamePath.replace("{gameId}", gameId.toString())}`,
};
