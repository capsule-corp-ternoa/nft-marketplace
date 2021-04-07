export const getUser = async () => {
  /*
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/user/${id}`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
  */

  return false;
};

export const getProfile = async (id: any) => {
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/users/${id}`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
};

export const getUsers = async () => {
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/users`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data.docs;
};
