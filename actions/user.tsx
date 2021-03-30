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
    caps: 89302,
    img:
      'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
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
