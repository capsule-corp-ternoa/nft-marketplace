import { CustomResponse, NftType, UserType } from 'interfaces/index';
import { filterNFTs } from "./nft";
import { DEFAULT_LIMIT_PAGINATION, NODE_API_URL } from "../utils/constant";
import Cookies from 'js-cookie';

export const getUser = async (token: string) => {
  const res = await fetch(
    `${NODE_API_URL}/api/users/${token}`
  );

  if (!res.ok) throw new Error();
  const userData = await res.json();
  const capsResponse = await fetch(
    `${NODE_API_URL}/api/users/${token}/caps`
  );

  let capsData = null;
  if (capsResponse.ok) {
    capsData = await capsResponse.json();
  }

  return { ...userData, ...capsData };
};

export const getProfile = async (id: string, walletIdViewer: string | null, ip?: string) => {
  const res = await fetch(
    `${NODE_API_URL}/api/users/${id}?incViews=${true}&walletIdViewer=${walletIdViewer}&viewerIp=${ip}`
  );

  if (!res.ok) throw new Error();

  return await res.json();
};

export const getAccountBalance = async (id: string) => {
  const res = await fetch(
    `${NODE_API_URL}/api/users/${id}/caps`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();
  return data.capsAmout;
};

export const getUsers = async () => {
  const res = await fetch(`${NODE_API_URL}/api/users`);
  if (!res.ok) throw new Error();
  const response: CustomResponse<UserType> = await res.json();
  return response;
};

export const getUsersByWalletIds = async (walletIds: string[]) => {
  if (walletIds.length === 0) return {totalCount:0, data:[]}
  const query = `?walletIds=${walletIds.join("&walletIds=")}`
  const res = await fetch(`${NODE_API_URL}/api/users/getUsers${query}`);
  if (!res.ok) throw new Error();
  const response: CustomResponse<UserType> = await res.json();
  return response;
};

export const reviewRequested = async (walletId: string) => {
  const cookie = Cookies.get("token")
  if(cookie){
    const res = await fetch(`${NODE_API_URL}/api/users/reviewRequested/${walletId}`,{
      method: 'PATCH',
      body:JSON.stringify({cookie}),
    });
    if (!res.ok) throw new Error();
    const userData = await res.json();
    return userData;
  }else{
    throw new Error("Unvalid authentication");
  }  
};

export const likeNFT = async (walletId: string, nftId: string, serieId: string) => {
  const cookie = Cookies.get("token")
  if(cookie){
    const res = await fetch(`${NODE_API_URL}/api/users/like/?walletId=${walletId}&nftId=${nftId}&serieId=${serieId}`, {
      method: 'POST',
      body:JSON.stringify({cookie}),
    })
    if (!res.ok) throw new Error();
    const user = await res.json()
    return user
  }else{
    throw new Error("Unvalid authentication");
  }
}

export const unlikeNFT = async (walletId: string, nftId: string, serieId: string) => {
  const cookie = Cookies.get("token")
  if(cookie){
    const res = await fetch(`${NODE_API_URL}/api/users/unlike/?walletId=${walletId}&nftId=${nftId}&serieId=${serieId}`, {
      method: 'POST',
      body:JSON.stringify({cookie}),
    })
    if (!res.ok) throw new Error();
    const user = await res.json()
    return user
  }else{
    throw new Error("Unvalid authentication");
  }
}

export const getLikedNFTs = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, noSeriesData: boolean = false) => {
  const res = await fetch(`${NODE_API_URL}/api/users/${walletId}/liked?page=${page}&limit=${limit}&noSeriesData=${noSeriesData}`)
  if (!res.ok) throw new Error();
  let result: CustomResponse<NftType> = await res.json();
  result.data = filterNFTs(result.data)
  return result;
}