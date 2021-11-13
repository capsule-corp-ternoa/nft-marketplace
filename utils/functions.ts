import { IncomingMessage } from "http"

export const getUserIp = (req: IncomingMessage | undefined) => {
  let ip: string | undefined = ""
  if (req) {
    const forwarded = req.headers["x-forwarded-for"] as string
    ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
  }
  return ip
}
export const appLog = (...args: any) => window.ReactNativeWebView ? window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'console.log', args })) : console.log(...args);

export const clipboardCopy = (str: string) => {
  if (navigator && navigator.clipboard){
    navigator.clipboard.writeText(str)
  }
}