import { CustomResponse, NftType } from 'interfaces/index'
import { MARKETPLACE_ID, NODE_API_URL } from 'utils/constant'
import { encryptCookie } from 'utils/cookie'
import { DEFAULT_LIMIT_PAGINATION, SORT_OPTION_CREATED_AT_DESC, SORT_OPTIONS } from '../utils/constant'
import Cookies from 'js-cookie'

type FilterOptionsType = {
  ids?: string[]
  idsToExclude?: string[]
  liked?: string
  series?: string[]
  marketplaceId?: number
  listed?: boolean
  categories?: string[]
  owner?: string
  creator?: string
  priceStartRange?: number
  priceEndRange?: number
  timestampCreateStartRange?: Date
  timestampCreateEndRange?: Date
  seriesLocked?: boolean
  isCapsule?: boolean
}
type SortOptionsType = typeof SORT_OPTIONS[number]

export const filterNFTs = (data: NftType[]) => data.filter((item) => item.properties?.preview.ipfs)

export const getOwnedNFTS = async (
  id: string,
  onlyFromMpId: boolean,
  listed?: boolean,
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  nftIdsFilter: string[] = []
) => {
  const paginationOptions = { page, limit }
  const filterOptions: any = { owner: id }
  if (listed !== undefined) filterOptions.listed = listed
  if (onlyFromMpId) filterOptions.marketplaceId = MARKETPLACE_ID
  if (nftIdsFilter.length > 0) filterOptions.ids = nftIdsFilter
  const sortOptions = 'created_at:desc'
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(
      filterOptions
    )}&sort=${sortOptions}`
  )
  if (!res.ok) throw new Error('error fetching owned NFTs')
  const result: CustomResponse<NftType> = await res.json()
  result.data = filterNFTs(result.data)
  return result
}

export const getCreatorNFTS = async (id: string, page = '1', limit: string = DEFAULT_LIMIT_PAGINATION) => {
  const paginationOptions = { page, limit }
  const filterOptions: any = { creator: id }
  const sortOptions = 'created_at:desc'
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(
      filterOptions
    )}&sort=${sortOptions}`
  )
  if (!res.ok) throw new Error('error fetching created NFTs')
  const result: CustomResponse<NftType> = await res.json()
  result.data = filterNFTs(result.data)
  return result
}

export const getNFTs = async (
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  filterOptions: FilterOptionsType = {},
  sortOption: SortOptionsType = SORT_OPTION_CREATED_AT_DESC,
  useCache = false
) => {
  const paginationOptions = { page, limit }
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify({
      ...filterOptions,
      marketplaceId: Number(MARKETPLACE_ID),
    })}&sort=${sortOption}&useCache300=${useCache}`
  )
  if (!res.ok) throw new Error('error fetching NFTs by categories')
  const result: CustomResponse<NftType> = await res.json()
  result.data = filterNFTs(result.data)
  return result
}

export const getNFT = async (
  id: string,
  incViews = false,
  viewerWalletId: string | null = null,
  ip?: string,
  marketplaceId?: string,
  useCache = false
) => {
  const filterOptions: any = { marketplaceId }
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/${id}?filter=${JSON.stringify(
      filterOptions
    )}&incViews=${incViews}&viewerWalletId=${viewerWalletId}&viewerIp=${ip}&useCache60=${useCache}`
  )
  if (!res.ok) throw new Error('error fetching NFT')
  const data: NftType = await res.json()
  if (!data.properties?.preview.ipfs) throw new Error()
  return data
}

export const getLikedNFTs = async (walletId: string, page = '1', limit: string = DEFAULT_LIMIT_PAGINATION) => {
  const paginationOptions = { page, limit }
  const filterOptions: any = { liked: walletId }
  const sortOptions = 'created_at:desc'
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(
      filterOptions
    )}&sort=${sortOptions}`
  )
  if (!res.ok) throw new Error()
  const result: CustomResponse<NftType> = await res.json()
  result.data = filterNFTs(result.data)
  return result
}

export const getByTheSameArtistNFTs = async (
  walletId: string,
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION
) => {
  const paginationOptions = { page, limit }
  const filterOptions: any = { creator: walletId }
  const sortOptions = 'created_at:desc'
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(
      filterOptions
    )}&sort=${sortOptions}&useCache300=true`
  )
  if (!res.ok) throw new Error()
  const result: CustomResponse<NftType> = await res.json()
  result.data = filterNFTs(result.data)
  return result
}

export const getUserNFTsStat = async (
  id: string,
  onlyFromMpId: boolean
): Promise<{
  countOwned: number
  countOwnedListed: number
  countOwnedUnlisted: number
  countCreated: number
  countFollowers: number
  countFollowed: number
}> => {
  const filterOptions: any = {}
  if (onlyFromMpId) filterOptions.marketplaceId = MARKETPLACE_ID
  const res = await fetch(`${NODE_API_URL}/api/NFTs/stat/${id}?filter=${JSON.stringify(filterOptions)}`)
  if (!res.ok) throw new Error('error fetching user NFTs stat')
  const result = await res.json()
  return result
}

export const getHistory = async (nftId: string, seriesId: string, grouped = false) => {
  const sortOptions = 'timestamp:desc'
  const filterOptions: any = { seriesId, nftId, grouped }
  const res = await fetch(
    `${NODE_API_URL}/api/nfts/history/?sort=${sortOptions}&filter=${JSON.stringify(filterOptions)}&useCache300=true`
  )
  if (!res.ok) throw new Error('error fetching NFT history')
  const result = await res.json()
  return result
}

export const canAddToSeries = async (seriesId: string, walletId: string) => {
  const res = await fetch(`${NODE_API_URL}/api/nfts/series/can-add?seriesId=${seriesId}&walletId=${walletId}`)
  if (!res.ok) throw new Error('error getting information about this series for this user')
  const result = await res.json()
  return result as boolean
}

export const addNFTsToCategories = async (creator: string, chainIds: string[], categories: string[]) => {
  const nftsAuthToken = encryptCookie(`${creator},${chainIds.join('-')},${categories.join('-')}`)
  const res = await fetch(`${NODE_API_URL}/api/nfts/add-nfts-categories`, {
    method: 'POST',
    body: JSON.stringify({ creator, chainIds, categories, nftsAuthToken }),
  })
  if (!res.ok) throw new Error()
  const success: boolean = await res.json()
  return success
}

export const getSeriesData = async (
  seriesId: string,
  marketplaceId: string = MARKETPLACE_ID,
  owner?: string,
  page?: string,
  limit?: string
) => {
  const paginationOptions = { page, limit }
  const filterOptions: any = { owner, marketplaceId }
  const res = await fetch(
    `${NODE_API_URL}/api/nfts/series/data/?seriesIds=${seriesId}&pagination=${JSON.stringify(
      paginationOptions
    )}&filter=${JSON.stringify(filterOptions)}&useCache60=true`
  )
  if (!res.ok) throw new Error('error fetching NFT series data')
  const result = await res.json()
  return result
}

export const getTotalOnSaleOnMarketplace = async (marketplaceId: string = MARKETPLACE_ID): Promise<number> => {
  const res = await fetch(`${NODE_API_URL}/api/nfts/total-on-sale/?marketplaceId=${marketplaceId}`)
  if (!res.ok) throw new Error('error fetching NFT total')
  const result = await res.json()
  return result
}

type FilteredNFTsOptionsType = {
  categories?: string[]
  listed?: boolean
  marketplaceId?: number
  priceStartRange?: number
  priceEndRange?: number
  timestampCreateStartRange?: Date
  timestampCreateEndRange?: Date
}
export const getTotalFilteredNFTsOnMarketplace = async (
  filterOptions: FilteredNFTsOptionsType = {},
  useCache = false
): Promise<number> => {
  const res = await fetch(
    `${NODE_API_URL}/api/nfts/total-filtered/?filter=${JSON.stringify({
      ...filterOptions,
      marketplaceId: Number(MARKETPLACE_ID),
    })}&useCache300=${useCache}`
  )
  if (!res.ok) throw new Error('error fetching NFT total')
  const result = await res.json()
  return result
}

export const likeNFT = async (walletId: string, nftId: string, serieId: string) => {
  const cookie = Cookies.get('token')
  if (cookie) {
    const res = await fetch(`${NODE_API_URL}/api/nfts/like/?walletId=${walletId}&nftId=${nftId}&seriesId=${serieId}`, {
      method: 'POST',
      body: JSON.stringify({ cookie }),
    })
    if (!res.ok) throw new Error()
    const NFTLike = await res.json()
    return NFTLike
  } else {
    throw new Error('Unvalid authentication')
  }
}

export const unlikeNFT = async (walletId: string, nftId: string, serieId: string) => {
  const cookie = Cookies.get('token')
  if (cookie) {
    const res = await fetch(
      `${NODE_API_URL}/api/nfts/unlike/?walletId=${walletId}&nftId=${nftId}&seriesId=${serieId}`,
      {
        method: 'POST',
        body: JSON.stringify({ cookie }),
      }
    )
    if (!res.ok) throw new Error()
    const NFTLike = await res.json()
    return NFTLike
  } else {
    throw new Error('Unvalid authentication')
  }
}

export const getMostLikedNFTs = async (
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  useCache = false
): Promise<CustomResponse<NftType>> => {
  const paginationOptions = { page, limit }
  const res = await fetch(
    `${NODE_API_URL}/api/nfts/most-liked/?pagination=${JSON.stringify(paginationOptions)}&useCache300=${useCache}`
  )
  if (!res.ok) throw new Error('error fetching NFT total')
  const result: CustomResponse<NftType> = await res.json()
  return result
}

export const getMostSoldNFTs = async (
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  useCache = false
): Promise<CustomResponse<NftType>> => {
  const paginationOptions = { page, limit }
  const res = await fetch(
    `${NODE_API_URL}/api/nfts/most-sold/?pagination=${JSON.stringify(paginationOptions)}&useCache300=${useCache}`
  )
  if (!res.ok) throw new Error('error fetching NFT total')
  const result: CustomResponse<NftType> = await res.json()
  return result
}

export const getMostSoldSeries = async (
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  useCache = false
): Promise<CustomResponse<NftType>> => {
  const paginationOptions = { page, limit }
  const res = await fetch(
    `${NODE_API_URL}/api/nfts/most-sold-series/?pagination=${JSON.stringify(paginationOptions)}&useCache300=${useCache}`
  )
  if (!res.ok) throw new Error('error fetching NFT total')
  const result: CustomResponse<NftType> = await res.json()
  return result
}

export const getMostViewedNFTs = async (
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  useCache = false
): Promise<CustomResponse<NftType>> => {
  const paginationOptions = { page, limit }
  const res = await fetch(
    `${NODE_API_URL}/api/nfts/most-viewed/?pagination=${JSON.stringify(paginationOptions)}&useCache300=${useCache}`
  )
  if (!res.ok) throw new Error('error fetching NFT total')
  const result: CustomResponse<NftType> = await res.json()
  return result
}

export const getBestSellers = async (
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  useCache = false
): Promise<CustomResponse<NftType>> => {
  const paginationOptions = { page, limit }
  const res = await fetch(
    `${NODE_API_URL}/api/nfts/top-sellers/?pagination=${JSON.stringify(paginationOptions)}&useCache300=${useCache}`
  )
  if (!res.ok) throw new Error('error fetching NFT total')
  const result: CustomResponse<NftType> = await res.json()
  return result
}
