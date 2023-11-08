import { Dispatch } from 'react';

export type AsyncAction<ActionType> =
    | ActionType
    | ((dispatch: (action: ActionType) => void) => Promise<void> | void);

export type AsyncDispatch<ActionType> = Dispatch<AsyncAction<ActionType>>;
