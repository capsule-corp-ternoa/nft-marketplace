import { CustomResponse, NftType } from 'interfaces/index';
import { MARKETPLACE_ID, NODE_API_URL } from 'utils/constant';
import { envStringToCondition } from '../utils/strings'
import { DEFAULT_LIMIT_PAGINATION } from "../utils/constant";

export const filterNFTs = (data: NftType[]) => data.filter((item) => item.creatorData && item.ownerData && item.media && envStringToCondition(Number(item.id)))

export const getOwnedNFTS = async (id: string, onlyFromMpId: boolean, listed? :number,  page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const res = await fetch(`${NODE_API_URL}/api/NFTs/owner/${id}?page=${page}&limit=${limit}${listed!==undefined ? `&listed=${listed}` : ""}${onlyFromMpId ? `&marketplaceId=${MARKETPLACE_ID}` : ""}`);
  if (!res.ok) throw new Error('error fetching owned NFTs');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
};

export const getCreatorNFTS = async (id: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/creator/${id}?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error('error fetching created NFTs');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
};

export const getCategoryNFTs = async (codes?: string | string[], page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const queryString = !codes ? "" : (typeof codes==='string' ? `&codes=${codes}` : `&codes=${codes.join("&codes=")}`)
  const res = await fetch(
    `${NODE_API_URL}/api/NFTs/category/?marketplaceId=${MARKETPLACE_ID}&listed=1&page=${page}&limit=${limit}${queryString}`
  );
  if (!res.ok) throw new Error('error fetching NFTs by categories');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result
};

export const getNFT = async (id: string, incViews: boolean = false, viewerWalletId: string | null = null) => {
  const res = await fetch(`${NODE_API_URL}/api/NFTs/${id}?incViews=${incViews}&viewerWalletId=${viewerWalletId}`);
  if (!res.ok) throw new Error('error fetching NFT');
  let data: NftType = await res.json();
  if (!data.creatorData || !data.ownerData || !data.media) throw new Error();
  return data;
};

export const getUserNFTsStat = async (id: string, onlyFromMpId: boolean): Promise<{
  countOwned: number, 
  countOwnedListed: number, 
  countOwnedUnlisted: number, 
  countCreated: number, 
  countFollowers: number, 
  countFollowed: number
 }> => {
  const res = await fetch(`${NODE_API_URL}/api/NFTs/stat/${id}${onlyFromMpId ? `?marketplaceId=${MARKETPLACE_ID}` : ""}`);
  if (!res.ok) throw new Error('error fetching user NFTs stat');
  let result = await res.json()
  return result;
};