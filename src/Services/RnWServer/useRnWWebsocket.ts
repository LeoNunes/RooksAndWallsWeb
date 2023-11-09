import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { ServerAction, ServerState, isServerState } from './Data';
import { webSocketConfig } from '../../RnWConfig';

export function useRnWWebsocket(gameId: number, onUpdate: (state: ServerState) => void) {
    const { lastMessage, lastJsonMessage, sendJsonMessage } = useWebSocket(
        webSocketConfig.urlForGame(gameId),
        {
            onOpen() {
                console.log('Connected to websocket');
            },
            onClose() {
                console.log('Disconnected from websocket');
            },
        },
    );

    useEffect(() => {
        if (lastJsonMessage !== null && isServerState(lastJsonMessage)) {
            console.log('Websocket message received:', lastJsonMessage);
            onUpdate(lastJsonMessage);
        } else {
            console.warn('Websocket message received with an invalid format:', lastMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage, lastJsonMessage]);

    return function dispatch(action: ServerAction) {
        sendJsonMessage(action);
    };
}
