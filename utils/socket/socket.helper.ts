import io, { Socket } from 'socket.io-client';
export function connect(endPoint: string, query: any, options: any = null, timeout: number = 1 * 60 * 1000): Socket {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}${endPoint}`, {
        query,
        transports: ['websocket'],
        forceNew: true,
        ...options,
    });
    setTimeout(() => {
        // autodisconnect after timeout if still open
        if (socket?.connected) {
            socket.close();
        }
    }, timeout);
    return socket;
}