export type Dispatch<ActionType> = (action: ActionType) => void;

export type AsyncAction<ActionType, StateType = unknown> =
    | ActionType
    | ((dispatch: Dispatch<ActionType>, getState: () => StateType) => Promise<void> | void);

export type AsyncDispatch<ActionType, StateType> = Dispatch<AsyncAction<ActionType, StateType>>;
