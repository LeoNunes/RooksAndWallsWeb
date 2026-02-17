import BoardBase, { type BoardBaseProps } from "Components/Board/BoardBase";
import type { Dispatch } from "Domain/Common/DataTypes";
import { createAction, type RnWActions } from "Domain/RnW/Actions";
import { createModel, type RnWModel } from "Domain/RnW/Model";
import { RnWStateProvider, useRnWDispatch, useRnWState } from "Domain/RnW/RnWStateProvider";
import { rnwConfig } from "RnWConfig";
import type { RnWGameAction as ServerGameAction } from "Services/RnWServer/Actions";
import type { RnWGameState as ServerGameState } from "Services/RnWServer/Data";
import { useRnWWebsocket } from "Services/RnWServer/useRnWWebsocket";
import { useGetter, useImagePreloader } from "Util";
import type { ComponentType } from "react";
import useClickMovement from "./useClickMovement";
import useDnDMovement from "./useDnDMovement";
import useLastMoveHighlight from "./useLastMoveHighlight";
import usePiecePlacement from "./usePiecePlacement";
import usePieces from "./usePieces";
import useWallPlacement from "./useWallPlacement";
import useWalls from "./useWalls";

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

    useImagePreloader(Object.values(rnwConfig.pieces).flatMap((p) => [p.default.uri, p.disabled.uri]));

    function onWebsocketUpdate(state: ServerGameState) {
        rnwActions.updateFromServer(state);
    }
    const websocketDispatch = useRnWWebsocket(props.gameId, onWebsocketUpdate);

    const Board = useBoardComponent(getRnWModel, getRnWActions, websocketDispatch);
    return <Board rows={props.board.rows} columns={props.board.columns} haveEdges={true} />;
}

function useBoardComponent(
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerGameAction>,
): ComponentType<BoardBaseProps> {
    let Board: ComponentType<BoardBaseProps> = BoardBase;

    Board = useWallPlacement(Board, getRnWModel, getRnWActions, websocketDispatch);
    Board = useClickMovement(Board, getRnWModel, getRnWActions);
    Board = usePiecePlacement(Board, getRnWModel, getRnWActions, websocketDispatch);
    Board = useLastMoveHighlight(Board, getRnWModel);
    Board = useDnDMovement(Board, getRnWModel, getRnWActions);
    Board = useWalls(Board, getRnWModel);
    Board = usePieces(Board, getRnWModel);

    return Board;
}
