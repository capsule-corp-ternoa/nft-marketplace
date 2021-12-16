import { CustomResponse, NftType } from 'interfaces/index';
import { MARKETPLACE_ID, NODE_API_URL } from 'utils/constant';
import { encryptCookie } from 'utils/cookie';
import { DEFAULT_LIMIT_PAGINATION } from "../utils/constant";

export const filterNFTs = (data: NftType[]) => data.filter((item) => item.properties?.preview.ipfs)

export const getOwnedNFTS = async (id: string, onlyFromMpId: boolean, listed? :boolean,  page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, noSeriesData: boolean = false, nftIdsFilter: string[] = []) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {owner: id, noSeriesData}
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

export const getCreatorNFTS = async (id: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, noSeriesData: boolean = false) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {creator: id, noSeriesData}
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}`
  );
  if (!res.ok) throw new Error('error fetching created NFTs');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
};

export const getNFTs = async (codes?: string[], page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, noSeriesData: boolean = false, listed? :Boolean) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {noSeriesData, marketplaceId: MARKETPLACE_ID}
  if (codes) filterOptions.categories = codes
  if (listed !== undefined) filterOptions.listed = listed
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}`
  );
  if (!res.ok) throw new Error('error fetching NFTs by categories');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result
};

export const getNFT = async (id: string, incViews: boolean = false, viewerWalletId: string | null = null, ip?: string, noSeriesData: boolean = false, marketplaceId?: string) => {
  const filterOptions: any = {noSeriesData, marketplaceId}
  const res = await fetch(`${NODE_API_URL}/api/NFTs/${id}?filter=${JSON.stringify(filterOptions)}&incViews=${incViews}&viewerWalletId=${viewerWalletId}&viewerIp=${ip}`);
  if (!res.ok) throw new Error('error fetching NFT');
  let data: NftType = await res.json();
  if (!data.properties?.preview.ipfs) throw new Error();
  return data;
};

export const getLikedNFTs = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, noSeriesData: boolean = false) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {liked: walletId, noSeriesData}
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}`
  );
  if (!res.ok) throw new Error();
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
}

export const getByTheSameArtistNFTs = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, noSeriesData: boolean = false) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {creator: walletId, noSeriesData}
  const sortOptions: string = "created_at:desc"
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}&sort=${sortOptions}`
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
  const res = await fetch(`${NODE_API_URL}/api/nfts/history/?sort=${sortOptions}&filter=${JSON.stringify(filterOptions)}`);
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