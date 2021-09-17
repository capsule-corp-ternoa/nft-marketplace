import { PaginationType, NftType } from 'interfaces/index';
import { filterNFTs, DEFAULT_LIMIT_PAGINATION } from "./nft";

export const getUser = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${token}`
  );

  if (!res.ok) throw new Error();
  const userData = await res.json();
  const capsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${token}/caps`
  );

  let capsData = null;
  if (capsResponse.ok) {
    capsData = await capsResponse.json();
  }

  return { ...userData, ...capsData };
};

export const getProfile = async (id: string, walletId: string | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${id}?incViews=${true}&walletIdViewer=${walletId}`
  );

  if (!res.ok) throw new Error();

  return await res.json();
};

export const getAccountBalance = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${id}/caps`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();
  return data.capsAmout;
};

export const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/users`);

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data.docs;
};

export const reviewRequested = async (walletId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/users/reviewRequested/${walletId}`,{
    method: 'PATCH'
  });

  if (!res.ok) throw new Error();
  const userData = await res.json();
  return userData;
};

export const likeNFT = async (walletId: string, nftId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/users/like/?walletId=${walletId}&nftId=${nftId}`, {
    method: 'POST'
  })
  if (!res.ok) throw new Error();
  const user = await res.json()
  return user
}

export const unlikeNFT = async (walletId: string, nftId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/users/unlike/?walletId=${walletId}&nftId=${nftId}`, {
    method: 'POST'
  })
  if (!res.ok) throw new Error();
  const user = await res.json()
  return user
}

export const getLikedNFTs = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/users/${walletId}/liked?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error();
  let result: PaginationType<NftType> = (await res.json()).nftEntities;
  result.nodes = filterNFTs(result.nodes)
  return result;
}