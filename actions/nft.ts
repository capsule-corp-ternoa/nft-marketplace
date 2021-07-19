import { NftType } from 'interfaces/index';
import { envStringToCondition } from '../utils/strings'

export const getNFTS = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/NFTs`);
  let data: NftType[] = await res.json();
  data = data.filter((item) => item.creatorData && item.ownerData);
  data = data.filter((item) => item.media);
  data = data.filter((item) => item.listed === 1);
  data = data.filter((item) => envStringToCondition(Number(item.id)));

  const displayNFTs: NftType[] = [];
  const seriesCount: any = {};

  // count listed NFTs for each series
  data.forEach((nft) => {
    if (nft.serieId === '0') {
      displayNFTs.push(nft);
    } else {
      if (!seriesCount[nft.serieId]) {
        displayNFTs.push(nft);
        seriesCount[nft.serieId] = 1;
      } else {
        seriesCount[nft.serieId]++;
      }
    }
  });

  return [displayNFTs, seriesCount];
};

export const getProfileNFTS = async (
  id: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/mp/NFTs/owner/${id}`
  );

  if (!res.ok) throw new Error('error fetching owned NFTs');

  let data: NftType[] = await res.json();
  data = data.filter((item) => item.creatorData && item.ownerData);
  data = data.filter((item) => item.media);
  data = data.filter((item) => envStringToCondition(Number(item.id)));

  const displayNFTs: NftType[] = [];
  const seriesCount: any = {};

  // count listed NFTs for each series
  data.forEach((nft) => {
    if (nft.serieId === '0') {
      displayNFTs.push(nft);
    } else {
      if (typeof seriesCount[nft.serieId] === 'undefined') {
        displayNFTs.push(nft);
        if (nft.listed === 1) seriesCount[nft.serieId] = 1;
        else seriesCount[nft.serieId] = 0;
      } else {
        if (nft.listed === 1) seriesCount[nft.serieId]++;
      }
    }
  });

  return [displayNFTs, seriesCount];
};

export const getCreatorNFTS = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/mp/NFTs/creator/${id}`
  );

  if (!res.ok) throw new Error('error fetching created NFTs');

  let data: NftType[] = await res.json();
  data = data.filter((item) => item.creatorData && item.ownerData);
  data = data.filter((item) => item.media);
  data = data.filter((item) => envStringToCondition(Number(item.id)));


  const displayNFTs: NftType[] = [];
  const seriesCount: any = {};

  // count listed NFTs for each series
  data.forEach((nft) => {
    if (nft.serieId === '0') {
      displayNFTs.push(nft);
    } else {
      if (typeof seriesCount[nft.serieId] === 'undefined') {
        displayNFTs.push(nft);
        if (nft.listed === 1) seriesCount[nft.serieId] = 1;
        else seriesCount[nft.serieId] = 0;
      } else {
        if (nft.listed === 1) seriesCount[nft.serieId]++;
      }
    }
  });

  return [displayNFTs, seriesCount];
};

export const getCategoryNFTs = async (codes?: string | string[]) => {
  const queryString = !codes ? "" : (typeof codes==='string' ? `?codes=${codes}` : `?codes=${codes.join("&codes=")}`)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/mp/NFTs/category/${queryString}`
  );

  if (!res.ok) throw new Error('error fetching NFTs');

  let data: NftType[] = await res.json();
  data = data.filter(
    (item) => item.creatorData && item.ownerData && item.media && item.listed && envStringToCondition(Number(item.id))
  );

  const displayNFTs: NftType[] = [];
  const seriesCount: any = {};

  // count listed NFTs for each series
  data.forEach((nft) => {
    if (nft.serieId === '0') {
      displayNFTs.push(nft);
    } else {
      if (!seriesCount[nft.serieId]) {
        displayNFTs.push(nft);
        seriesCount[nft.serieId] = 1;
      } else {
        seriesCount[nft.serieId]++;
      }
    }
  });

  return [displayNFTs, seriesCount];
};

export const getNFT = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/NFTs/${id}`);

  if (!res.ok) throw new Error();

  let data: NftType = await res.json();
  if (!data.creatorData || !data.ownerData || !data.media) throw new Error();

  return data;
};

export const getTotalOnSaleCountNFT = async (serieId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/NFTs/onSaleSeriesNFTsCount/${serieId}`);
  if (!res.ok) throw new Error();
  let data: number = await res.json();
  if (typeof data !== "number") throw new Error();
  return data;
};
