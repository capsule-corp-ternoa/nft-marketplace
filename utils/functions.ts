import { IncomingMessage } from 'http'
import { NextRouter } from 'next/router'

import { getNFTs, getMostLikedNFTs, getMostSoldNFTs, getMostSoldSeries, getMostViewedNFTs } from 'actions/nft'
import { CustomResponse, NftType } from 'interfaces'
import { SortTypesType } from 'interfaces/filters'
import {
  DATE_ASC_SORT,
  DATE_DESC_SORT,
  MOST_LIKED_SORT,
  MOST_SOLD_SORT,
  MOST_SOLD_SERIES_SORT,
  MOST_VIEWED_SORT,
  PRICE_ASC_SORT,
  PRICE_DESC_SORT,
  SORT_OPTION_PRICE_ASC,
  SORT_OPTION_PRICE_DESC,
  SORT_OPTION_TIMESTAMP_CREATE_ASC,
  SORT_OPTION_TIMESTAMP_CREATE_DESC,
} from 'utils/constant'

export const getUserIp = (req: IncomingMessage | undefined) => {
  let ip: string | undefined = ''
  if (req) {
    const forwarded = req.headers['x-forwarded-for'] as string
    ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
  }
  return ip
}
export const appLog = (...args: any) =>
  window.ReactNativeWebView
    ? window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'console.log', args }))
    : console.log(...args)

export const clipboardCopy = (str: string) => {
  try {
    navigator.clipboard.writeText(str)
  } catch (err) {
    console.log(err)
  }
}

export const navigateToSuccess = (
  router: NextRouter,
  title: string,
  buttonText: string,
  returnUrl: string,
  isRedirect: boolean,
  text?: string,
  subText?: string
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
        subText,
      },
    },
    '/success'
  )
}

export const getRandomNFTFromArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const emojiMapping = (s: string) => {
  if (s.localeCompare('music', undefined, { sensitivity: 'base' }) === 0) return '🎵'
  else if (s.localeCompare('art', undefined, { sensitivity: 'base' }) === 0) return '🎨'
  else if (s.localeCompare('photo', undefined, { sensitivity: 'base' }) === 0) return '📸'
  else if (s.localeCompare('games', undefined, { sensitivity: 'base' }) === 0) return '👾'
  else if (s.localeCompare('meme', undefined, { sensitivity: 'base' }) === 0) return '🤡'
  else if (s.localeCompare('design', undefined, { sensitivity: 'base' }) === 0) return '✨'

  return undefined
}

export const sortPromiseMapping = (
  sort: Partial<SortTypesType>,
  currentPage: number
): Promise<CustomResponse<NftType>> | null => {
  if (sort[MOST_LIKED_SORT] === true) {
    return getMostLikedNFTs((currentPage + 1).toString(), undefined, true)
  } else if (sort[MOST_SOLD_SORT] === true) {
    return getMostSoldNFTs((currentPage + 1).toString(), undefined, true)
  } else if (sort[MOST_SOLD_SERIES_SORT] === true) {
    return getMostSoldSeries((currentPage + 1).toString(), undefined, true)
  } else if (sort[MOST_VIEWED_SORT] === true) {
    return getMostViewedNFTs((currentPage + 1).toString(), undefined, true)
  } else if (sort[DATE_ASC_SORT] === true) {
    return getNFTs((currentPage + 1).toString(), undefined, { listed: true }, SORT_OPTION_TIMESTAMP_CREATE_ASC, true)
  } else if (sort[DATE_DESC_SORT] === true) {
    return getNFTs((currentPage + 1).toString(), undefined, { listed: true }, SORT_OPTION_TIMESTAMP_CREATE_DESC, true)
  } else if (sort[PRICE_ASC_SORT] === true) {
    return getNFTs((currentPage + 1).toString(), undefined, { listed: true }, SORT_OPTION_PRICE_ASC, true)
  } else if (sort[PRICE_DESC_SORT] === true) {
    return getNFTs((currentPage + 1).toString(), undefined, { listed: true }, SORT_OPTION_PRICE_DESC, true)
  } else {
    return null
  }
}
