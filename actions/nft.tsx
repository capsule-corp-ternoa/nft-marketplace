import { NftType } from 'interfaces/index';

export const getNFTS = async () => {
  const res = await fetch(
    'https://ternoa-marketplace-nft.herokuapp.com/api/NFTs'
  );
  let data: NftType[] = await res.json();

  return data;
};

export const getProfileNFTS = async (id: string) => {
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/NFTs/owner/${id}`
  );

  let data: NftType[] = await res.json();

  return data;
};

export const getNFT = async (id: string) => {
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/NFTs/${id}`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
};
