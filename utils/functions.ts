import { IncomingMessage } from "http"
import { NextRouter } from "next/router"

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

export const navigateToSuccess = (
  router: NextRouter,
  title: string,
  buttonText: string,
  returnUrl: string,
  isRedirect: boolean,
  text?: string,
) => {
  router.push(
    {
      pathname: '/success',
      query: {
        title,
        text,
        buttonText,
        returnUrl,
        isRedirect,
      }
    }, 
    "/success"
  )
}

export const getRandomNFTFromArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}