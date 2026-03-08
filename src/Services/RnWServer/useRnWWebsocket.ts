import type { Dispatch } from "Domain/Common/DataTypes";
import { useUserState } from "Domain/User/UserStateProvider";
import { webSocketConfig } from "RnWConfig";
import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import type { RnWGameAction } from "./Actions";
import { isRnWGameState, type RnWGameState } from "./Data";

export function useRnWWebsocket(gameId: number, onUpdate: (state: RnWGameState) => void): Dispatch<RnWGameAction> {
    const { user } = useUserState();

    // If user token changes, we don't want to close the WS connection and open a new one.
    // For that reason, we keep a ref of the token used to open the connection and only update once WS closes.
    // Undefined represents "not initialized yet", null represents "no token".
    const [token, setToken] = useState<string | null | undefined>(user.isGuest ? null : user.token);

    if (token === undefined) {
        setToken(user.isGuest ? null : user.token);
    }

    const wsUrl = webSocketConfig.urlForGame(gameId, token);
    const { lastMessage, lastJsonMessage, sendJsonMessage } = useWebSocket(wsUrl, {
        onOpen() {
            console.debug("Websocket - Connected");
        },
        onClose() {
            console.debug("Websocket - Disconnected");
            setToken(undefined);
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
