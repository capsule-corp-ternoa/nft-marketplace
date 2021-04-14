export const getUser = async (token?: any) => {
  /*
  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/auth/me`,
    {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
    }
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
  */

  const res = await fetch(
    `https://ternoa-marketplace-nft.herokuapp.com/api/users/${token}`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
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
