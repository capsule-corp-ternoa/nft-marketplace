import { CustomResponse, NftType } from 'interfaces/index';
import { MARKETPLACE_ID, NODE_API_URL } from 'utils/constant';
import { encryptCookie } from 'utils/cookie';
import { DEFAULT_LIMIT_PAGINATION } from "../utils/constant";

export const filterNFTs = (data: NftType[]) => data.filter((item) => item.properties?.preview.ipfs)

export const getOwnedNFTS = async (id: string, onlyFromMpId: boolean, listed? :boolean,  page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, nftIdsFilter: string[] = []) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {owner: id}
  if (listed !== undefined) filterOptions.listed = listed
  if (onlyFromMpId) filterOptions.marketplaceId = MARKETPLACE_ID
  if (nftIdsFilter.length > 0) filterOptions.ids = nftIdsFilter
  const sortOptions = "created_at:desc"
  const res = await fetch(`${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}&sort=${sortOptions}`);
  if (!res.ok) throw new Error('error fetching owned NFTs');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
};

export const getCreatorNFTS = async (id: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {creator: id}
  const sortOptions = "created_at:desc"
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}&sort=${sortOptions}`
  );
  if (!res.ok) throw new Error('error fetching created NFTs');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
};

export const getNFTs = async (codes?: string[], page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, listed? :Boolean, useCache = false) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {marketplaceId: MARKETPLACE_ID}
  const sortOptions = "created_at:desc"
  if (codes) filterOptions.categories = codes
  if (listed !== undefined) filterOptions.listed = listed
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}&sort=${sortOptions}&useCache300=${useCache}`
  );
  if (!res.ok) throw new Error('error fetching NFTs by categories');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result
};

export const getNFT = async (id: string, incViews: boolean = false, viewerWalletId: string | null = null, ip?: string, marketplaceId?: string, useCache=false) => {
  const filterOptions: any = {marketplaceId}
  const res = await fetch(`${NODE_API_URL}/api/NFTs/${id}?filter=${JSON.stringify(filterOptions)}&incViews=${incViews}&viewerWalletId=${viewerWalletId}&viewerIp=${ip}&useCache60=${useCache}`);
  if (!res.ok) throw new Error('error fetching NFT');
  let data: NftType = await res.json();
  if (!data.properties?.preview.ipfs) throw new Error();
  return data;
};

export const getLikedNFTs = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {liked: walletId}
  const sortOptions = "created_at:desc"
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}&sort=${sortOptions}`
  );
  if (!res.ok) throw new Error();
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
}

export const getByTheSameArtistNFTs = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {creator: walletId}
  const sortOptions: string = "created_at:desc"
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}&sort=${sortOptions}&useCache300=true`
  );
  if (!res.ok) throw new Error();
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
}

export const getUserNFTsStat = async (id: string, onlyFromMpId: boolean): Promise<{
  countOwned: number, 
  countOwnedListed: number, 
  countOwnedUnlisted: number, 
  countCreated: number, 
  countFollowers: number, 
  countFollowed: number
 }> => {
  const filterOptions: any = {}
  if (onlyFromMpId) filterOptions.marketplaceId = MARKETPLACE_ID
  const res = await fetch(`${NODE_API_URL}/api/NFTs/stat/${id}?filter=${JSON.stringify(filterOptions)}`);
  if (!res.ok) throw new Error('error fetching user NFTs stat');
  let result = await res.json()
  return result;
};

export const getHistory = async (nftId: string, seriesId: string, grouped: boolean=false) => {
  const sortOptions: string = "timestamp:desc"
  const filterOptions: any = { seriesId, nftId, grouped }
  const res = await fetch(`${NODE_API_URL}/api/nfts/history/?sort=${sortOptions}&filter=${JSON.stringify(filterOptions)}&useCache300=true`);
  if (!res.ok) throw new Error('error fetching NFT history');
  let result = await res.json()
  return result;
}

export const canAddToSeries = async (seriesId: string, walletId: string) => {
  const res = await fetch(`${NODE_API_URL}/api/nfts/series/can-add?seriesId=${seriesId}&walletId=${walletId}`)
  if (!res.ok) throw new Error('error getting information about this series for this user');
  let result = await res.json()
  return result as boolean
}

export const addNFTsToCategories = async (creator: string, chainIds: string[], categories: string[]) => {
  const nftsAuthToken = encryptCookie(`${creator},${chainIds.join('-')},${categories.join('-')}`)
  const res = await fetch(`${NODE_API_URL}/api/nfts/add-nfts-categories`, {
      method: 'POST',
      body:JSON.stringify({creator, chainIds, categories, nftsAuthToken}),
  });
  if (!res.ok) throw new Error();
  let success: boolean = await res.json();
  return success
}

export const getSeriesData = async (seriesId: string, marketplaceId: string=MARKETPLACE_ID, owner?: string, page?: string, limit?: string) => {
  const paginationOptions = { page, limit }
  const filterOptions: any = { owner, marketplaceId }
  const res = await fetch(`${NODE_API_URL}/api/nfts/series/data/?seriesIds=${seriesId}&pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}&useCache60=true`);
  if (!res.ok) throw new Error('error fetching NFT series data');
  let result = await res.json()
  return result;
}

export const getTotalOnSaleOnMarketplace = async (marketplaceId: string=MARKETPLACE_ID) => {
  const res = await fetch(`${NODE_API_URL}/api/nfts/total-on-sale/?marketplaceId=${marketplaceId}`)
  if (!res.ok) throw new Error('error fetching NFT total');
  let result = await res.json()
  return result;
}