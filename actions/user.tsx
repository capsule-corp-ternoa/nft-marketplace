export const getUser = async () => {
  /*
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/user/${id}`
  );

  const data = await res.json();

  return data;
  */

  const user = {
    name: 'Ternoart',
    caps: 0,
    verified: true,
    id: 9,
    twitter: 'ternoa_',
    description: 'Future is here.',
    address: '0x31R15fd5...4e3E75bf',
    views: 27939,
    followers: 1303,
    following: 109,
    walletId: 'xGjdG34UG647647Dghskdjs09676fikla564',
  };

  return user;
};

export const getProfile = async (id: any) => {
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/users/${id}`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
};
