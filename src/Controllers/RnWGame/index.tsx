import { ComponentType } from 'react';
import { useGetter } from '../../Util/hooks';
import { Dispatch } from '../../Domain/Common/DataTypes';
import { RnWModel, createModel } from '../../Domain/RnW/Model';
import { RnWActions, createAction } from '../../Domain/RnW/Actions';
import { RnWStateProvider, useRnWState, useRnWDispatch } from '../../Domain/RnW/RnWDataProvider';
import { ServerAction, ServerState } from '../../Services/RnWServer/Data';
import { useRnWWebsocket } from '../../Services/RnWServer/useRnWWebsocket';
import BoardBase, { BoardBaseProps } from '../../Components/Board/BoardBase';
import usePieces from './usePieces';
import useWalls from './useWalls';
import useLastMoveHighlight from './useLastMoveHighlight';
import usePiecePlacement from './usePiecePlacement';
import useWallPlacement from './useWallPlacement';
import useClickMovement from './useClickMovement';

export type RnWGameProps = RnWGameControllerProps;
export default function RnWGame(props: RnWGameProps) {
    return (
        <RnWStateProvider>
            <RnWGameController {...props} />
        </RnWStateProvider>
    );
}

type RnWGameControllerProps = {
    gameId: number;
    board: {
        rows: number;
        columns: number;
    };
};
function RnWGameController(props: RnWGameControllerProps) {
    const rnwState = useRnWState();
    const rnwDispatch = useRnWDispatch();
    const rnwModel = createModel(rnwState);
    const rnwActions = createAction(rnwDispatch);
    const getRnWModel = useGetter(rnwModel);
    const getRnWActions = useGetter(rnwActions);

    function onWebsocketUpdate(state: ServerState) {
        rnwActions.updateFromServer(state);
    }
    const websocketDispatch = useRnWWebsocket(props.gameId, onWebsocketUpdate);

    const Board = useBoardComponent(getRnWModel, getRnWActions, websocketDispatch);
    return <Board rows={props.board.rows} columns={props.board.columns} haveEdges={true} />;
}

function useBoardComponent(
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerAction>,
): ComponentType<BoardBaseProps> {
    let Board: ComponentType<BoardBaseProps> = BoardBase;

    Board = useWallPlacement(Board, getRnWModel, getRnWActions, websocketDispatch);
    Board = useClickMovement(Board, getRnWModel, getRnWActions);
    Board = usePiecePlacement(Board, getRnWModel, getRnWActions, websocketDispatch);
    Board = useLastMoveHighlight(Board, getRnWModel);
    Board = useWalls(Board, getRnWModel);
    Board = usePieces(Board, getRnWModel);

    return Board;
}
