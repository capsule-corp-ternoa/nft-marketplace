import { CustomResponse, NftType } from 'interfaces/index';
import { envStringToCondition } from '../utils/strings'

export const DEFAULT_LIMIT_PAGINATION = "10"

export const filterNFTs = (data: NftType[]) => data.filter((item) => item.creatorData && item.ownerData && item.media && envStringToCondition(Number(item.id)))

export const getNFTS = async (page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('error fetching NFTs');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
};

export const getProfileNFTS = async (id: string, listed? :number,  page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/owner/${id}?page=${page}&limit=${limit}${listed ? `&listed=${listed}` : ""}`);
  if (!res.ok) throw new Error('error fetching owned NFTs');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
};

export const getCreatorNFTS = async (id: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/creator/${id}?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error('error fetching created NFTs');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
};

export const getCategoryNFTs = async (codes?: string | string[], page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const queryString = !codes ? "" : (typeof codes==='string' ? `&codes=${codes}` : `&codes=${codes.join("&codes=")}`)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/category/?listed=1&page=${page}&limit=${limit}${queryString}`
  );
  if (!res.ok) throw new Error('error fetching NFTs by categories');
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result
};

export const getNFT = async (id: string, incViews: boolean = false, viewerWalletId: string | null = null) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/${id}?incViews=${incViews}&viewerWalletId=${viewerWalletId}`);
  if (!res.ok) throw new Error('error fetching NFT');
  let data: NftType = await res.json();
  if (!data.creatorData || !data.ownerData || !data.media) throw new Error();
  return data;
};

export const getUserNFTsStat = async (id: string): Promise<{
  countOwned: number, 
  countOwnedListed: number, 
  countOwnedUnlisted: number, 
  countCreated: number, 
  countFollowers: number, 
  countFollowed: number
 }> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/stat/${id}`);
  if (!res.ok) throw new Error('error fetching user NFTs stat');
  let result = await res.json()
  return result;
};