import { useCallback, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { Dispatch } from '../../Domain/Common/DataTypes';
import { ServerAction, ServerState, isServerState } from './Data';
import { webSocketConfig } from '../../RnWConfig';

export function useRnWWebsocket(
    gameId: number,
    onUpdate: (state: ServerState) => void,
): Dispatch<ServerAction> {
    const { lastMessage, lastJsonMessage, sendJsonMessage } = useWebSocket(
        webSocketConfig.urlForGame(gameId),
        {
            onOpen() {
                console.debug('Websocket - Connected');
            },
            onClose() {
                console.debug('Websocket - Disconnected');
            },
        },
    );

    useEffect(() => {
        if (lastMessage === null) return;
        if (lastJsonMessage !== null && isServerState(lastJsonMessage)) {
            console.debug('Websocket - message received:', lastJsonMessage);
            onUpdate(lastJsonMessage);
        } else {
            console.warn('Websocket - message received with an invalid format:', lastMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage, lastJsonMessage]);

    const dispatch = useCallback(
        (action: ServerAction) => {
            console.debug('Websocket - message sent:', action);
            // TODO: Test with fake latency.
            sendJsonMessage(action);
        },
        [sendJsonMessage],
    );

    return dispatch;
}
