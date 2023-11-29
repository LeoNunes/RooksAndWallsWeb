export type RnWManagerState = {
    games: Game[];
};

export type Game = {
    tempId?: string;
    gameId: number;
    isCreating: boolean;
};

export const rnwManagerInitialState: RnWManagerState = {
    games: [],
};
