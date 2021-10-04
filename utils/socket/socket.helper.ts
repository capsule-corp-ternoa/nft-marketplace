import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from 'utils/constant';

export function connect(endPoint: string, query: any, options: any = null, timeout: number = 1 * 60 * 1000): Socket {
    const socket = io(`${SOCKET_URL}${endPoint}`, {
        query,
        transports: ['websocket'],
        forceNew: true,
        ...options,
    });
    const disconnectTimeout = setTimeout(() => {
        // autodisconnect after timeout if still open
        if (socket?.connected) {
            socket.close();
        }
    }, timeout);
    socket.on('disconnect', () => {
        clearTimeout(disconnectTimeout);
    })
    return socket;
}