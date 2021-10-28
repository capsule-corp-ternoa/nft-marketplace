import { IncomingMessage } from "http"

export const getUserIp = (req: IncomingMessage | undefined) => {
    let ip: string | undefined = ""
    if (req){
      const forwarded = req.headers["x-forwarded-for"] as string
      ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    }
    return ip
}
