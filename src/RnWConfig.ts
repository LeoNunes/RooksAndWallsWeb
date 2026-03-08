import { getEnvConfig } from "./EnvConfig";

export type PieceColor = "blue" | "green" | "red" | "yellow";

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
    players: {
        0: { color: "blue" },
        1: { color: "green" },
        2: { color: "red" },
        3: { color: "yellow" },
    },
};

const apiPrefix = "/rw";
export const apiConfig = {
    createGame: {
        endpoint: () => `${getEnvConfig().apiBaseUrl}${apiPrefix}/game`,
        method: "POST",
    },
};

const wsGamePath = "/rw/game/{gameId}";
export const webSocketConfig = {
    urlForGame: (gameId: number, token?: string) => {
        const base = `${getEnvConfig().wsBaseUrl}${wsGamePath.replace("{gameId}", gameId.toString())}`;
        return token ? `${base}?token=${encodeURIComponent(token)}` : base;
    },
};
