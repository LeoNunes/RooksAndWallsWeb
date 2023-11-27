export type RnWManagerState = {
    games: Game[];
};

export type Game = {
    tempId: string;
    gameId: number;
    isCreating: boolean;
    isJoining: boolean;
};

export const rnwManagerInitialState: RnWManagerState = {
    games: [],
};
