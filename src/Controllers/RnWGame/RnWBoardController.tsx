import BoardBase from "Components/Board/BoardBase";
import withChessPieces from "Components/Board/withChessPieces";
import withClickMovement from "Components/Board/withClickMovement";
import withDnDMovement from "Components/Board/withDnDMovement";
import withEdgeHighlight from "Components/Board/withEdgeHighlight";
import withEdgePlacement from "Components/Board/withEdgePlacement";
import withSquareHighlight from "Components/Board/withSquareHighlight";
import withSquarePlacement from "Components/Board/withSquarePlacement";
import withWalls from "Components/Board/withWalls";
import type { Dispatch } from "Domain/Common/DataTypes";
import { createAction, type RnWActions } from "Domain/RnW/Actions";
import { createModel, type RnWModel } from "Domain/RnW/Model";
import { useRnWDispatch, useRnWState } from "Domain/RnW/RnWStateProvider";
import { rnwConfig } from "RnWConfig";
import type { RnWGameAction as ServerGameAction } from "Services/RnWServer/Actions";
import type { RnWGameState as ServerGameState } from "Services/RnWServer/Data";
import { useRnWWebsocket } from "Services/RnWServer/useRnWWebsocket";
import { useGetter, useImagePreloader } from "Util";
import { useCallback, useMemo } from "react";
import useLastMoveHighlight from "./useLastMoveHighlight";
import useMovement from "./useMovement";
import usePiecePlacement from "./usePiecePlacement";
import usePieces from "./usePieces";
import useWallPlacement from "./useWallPlacement";
import useWalls from "./useWalls";

export type RnWBoardControllerProps = {
    gameId: number;
    board: {
        rows: number;
        columns: number;
    };
};

export default function RnWBoardController(props: RnWBoardControllerProps) {
    const rnwState = useRnWState();
    const rnwDispatch = useRnWDispatch();
    const rnwModel = useMemo(() => createModel(rnwState), [rnwState]);
    const rnwActions = useMemo(() => createAction(rnwDispatch), [rnwDispatch]);
    const getRnWModel = useGetter(rnwModel);
    const getRnWActions = useGetter(rnwActions);

    useImagePreloader(Object.values(rnwConfig.pieces).flatMap((p) => [p.default.uri, p.disabled.uri]));

    const onWebsocketUpdate = useCallback(
        (state: ServerGameState) => {
            rnwActions.updateFromServer(state);
        },
        [rnwActions],
    );
    const websocketDispatch = useRnWWebsocket(props.gameId, onWebsocketUpdate);

    const Board = rnWBoard();
    const boardProperties = useBoardProperties(getRnWModel, getRnWActions, websocketDispatch);
    return <Board rows={props.board.rows} columns={props.board.columns} haveEdges={true} {...boardProperties} />;
}

function rnWBoard() {
    return withChessPieces(
        withWalls(
            withDnDMovement(
                withSquareHighlight(
                    withEdgeHighlight(withSquarePlacement(withEdgePlacement(withClickMovement(BoardBase)))),
                ),
            ),
        ),
    );
}

function useBoardProperties(
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerGameAction>,
) {
    const piecesProperties = usePieces(getRnWModel);
    const wallsProperties = useWalls(getRnWModel);
    const movementProperties = useMovement(getRnWModel, getRnWActions);
    const lastMoveHighlightProperties = useLastMoveHighlight(getRnWModel);
    const piecePlacementProperties = usePiecePlacement(getRnWModel, getRnWActions, websocketDispatch);
    const wallPlacementProperties = useWallPlacement(getRnWModel, getRnWActions, websocketDispatch);

    return {
        ...piecesProperties,
        ...wallsProperties,
        ...movementProperties,
        ...lastMoveHighlightProperties,
        ...piecePlacementProperties,
        ...wallPlacementProperties,
    };
}
