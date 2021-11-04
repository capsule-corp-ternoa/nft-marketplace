import { CustomResponse, NftType } from 'interfaces/index';
import { MARKETPLACE_ID, NODE_API_URL } from 'utils/constant';
import { envStringToCondition } from '../utils/strings'
import { DEFAULT_LIMIT_PAGINATION } from "../utils/constant";

export const filterNFTs = (data: NftType[]) => data.filter((item) => item.creatorData && item.ownerData && item.media && envStringToCondition(Number(item.id)))

export const getOwnedNFTS = async (id: string, onlyFromMpId: boolean, listed? :number,  page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, noSeriesData: boolean = false) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {owner: id, noSeriesData}
  if (listed) filterOptions.listed = listed
  if (onlyFromMpId) filterOptions.marketplaceId = MARKETPLACE_ID
  const res = await fetch(`${NODE_API_URL}/api/NFTs/?pagination=${JSON.stringify(paginationOptions)}&filter=${JSON.stringify(filterOptions)}`);
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

export const getCategoryNFTs = async (codes?: string[], page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, noSeriesData: boolean = false) => {
  const paginationOptions = {page, limit}
  const filterOptions: any = {noSeriesData, marketplaceId: MARKETPLACE_ID}
  if (codes) filterOptions.categories = codes
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
  if (!data.creatorData || !data.ownerData || !data.media) throw new Error();
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
