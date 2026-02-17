import type { Dispatch } from "Domain/Common/DataTypes";
import { webSocketConfig } from "RnWConfig";
import { useCallback, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import type { RnWGameAction } from "./Actions";
import { isRnWGameState, type RnWGameState } from "./Data";

export function useRnWWebsocket(gameId: number, onUpdate: (state: RnWGameState) => void): Dispatch<RnWGameAction> {
    const { lastMessage, lastJsonMessage, sendJsonMessage } = useWebSocket(webSocketConfig.urlForGame(gameId), {
        onOpen() {
            console.debug("Websocket - Connected");
        },
        onClose() {
            console.debug("Websocket - Disconnected");
        },
    });

    useEffect(() => {
        if (lastMessage === null) return;
        if (lastJsonMessage !== null && isRnWGameState(lastJsonMessage)) {
            console.debug("Websocket - message received:", lastJsonMessage);
            onUpdate(lastJsonMessage);
        } else {
            console.warn("Websocket - message received with an invalid format:", lastMessage);
        }
    }, [lastMessage, lastJsonMessage, onUpdate]);

    const dispatch = useCallback(
        (action: RnWGameAction) => {
            console.debug("Websocket - message sent:", action);
            // TODO: Test with fake latency.
            sendJsonMessage(action);
        },
        [sendJsonMessage],
    );

    return dispatch;
}
