import io, { Socket } from 'socket.io-client';
export function connect(endPoint: string, query: any, options: any = null, timeout: number = 1 * 60 * 1000): Socket {
    const socket = io(`${process.env.NEXT_PUBLIC_NODE_API}${endPoint}`, {
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