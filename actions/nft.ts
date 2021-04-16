import { NftType } from 'interfaces/index';

export const getNFTS = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs`);
  let data: NftType[] = await res.json();
  data = data.filter((item) => item.creatorData && item.ownerData);
  data = data.filter((item) => item.media);

  return data.slice(0, 25);
};

export const getProfileNFTS = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/owner/${id}`
  );

  let data: NftType[] = await res.json();
  data = data.filter((item) => item.creatorData && item.ownerData);
  data = data.filter((item) => item.media);

  return data;
};

export const getNFT = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/${id}`);

  if (!res.ok) throw new Error();

  let data: NftType = await res.json();
  if (!data.creatorData || !data.ownerData || !data.media) throw new Error();

  return data;
};
