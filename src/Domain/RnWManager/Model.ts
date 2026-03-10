export type RnWManagerState = {
    games: Game[];
};

export type Game = {
    tempId?: string;
    gameId: string;
    isCreating: boolean;
};

export const rnwManagerInitialState: RnWManagerState = {
    games: [],
};
