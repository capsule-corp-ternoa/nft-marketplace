export const getNFTS = async () => {
  const res = await fetch(
    'https://ternoa-marketplace-nft.herokuapp.com/api/NFTs'
  );
  const data = await res.json();

  return data;
};

export const getProfileNFTS = async (id: any) => {
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/NFTs/owner/${id}`
  );

  const data = await res.json();

  return data;
};

export const getNFT = async (id: any) => {
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/NFTs/${id}`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
};
