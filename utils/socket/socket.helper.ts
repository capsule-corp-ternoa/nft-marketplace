import io, { Socket } from 'socket.io-client'
import { SOCKET_URL } from 'utils/constant'

export function connect(endPoint: string, query: any, options: any = null, timeout: number = 1 * 60 * 1000): Socket {
  const socket = io(`${SOCKET_URL}${endPoint}`, {
    query,
    transports: ['websocket'],
    forceNew: true,
    ...options,
  })
  const disconnectTimeout = setTimeout(() => {
    // autodisconnect after timeout if still open
    if (socket?.connected) {
      socket.close()
    }
  }, timeout)
  socket.on('disconnect', () => {
    clearTimeout(disconnectTimeout)
  })
  return socket
}

const SOCKET_WAIT_TIMEOUT = 10 * 1000
let timeoutId: any = null
function timeoutPromise(mainPromise: Promise<any>, timeout: number = SOCKET_WAIT_TIMEOUT) {
  return Promise.race([
    mainPromise,
    new Promise((_resolve, reject) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        reject('socket timeout limit exceded')
      }, timeout)
    }),
  ])
}

export const socketWaitForEvent = (socket: Socket, eventName: string, timeout = SOCKET_WAIT_TIMEOUT) => {
  return timeoutPromise(
    new Promise((resolve, reject) => {
      if (socket && socket.connected) {
        socket.once(eventName, (args) => {
          resolve(args)
        })
      } else {
        reject('Socket is not connected')
      }
    }),
    timeout
  )
}
