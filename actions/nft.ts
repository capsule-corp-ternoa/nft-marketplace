import { NftType } from 'interfaces/index';

export const getNFTS = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs`);
  let data: NftType[] = await res.json();
  data = data.filter((item) => item.creatorData && item.ownerData);
  data = data.filter((item) => item.media);
  data = data.filter((item) => item.listed === 1);

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
  filterListed: boolean = true
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/owner/${id}`
  );

  if (!res.ok) throw new Error('error fetching owned NFTs');

  let data: NftType[] = await res.json();
  data = data.filter((item) => item.creatorData && item.ownerData);
  data = data.filter((item) => item.media);
  if (filterListed) data = data.filter((item) => item.listed === 1);

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

export const getCreatorNFTS = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/creator/${id}`
  );

  if (!res.ok) throw new Error('error fetching created NFTs');

  let data: NftType[] = await res.json();
  data = data.filter((item) => item.creatorData && item.ownerData);
  data = data.filter((item) => item.media);

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/NFTs/${id}`);

  if (!res.ok) throw new Error();

  let data: NftType = await res.json();
  if (!data.creatorData || !data.ownerData || !data.media) throw new Error();

  return data;
};
