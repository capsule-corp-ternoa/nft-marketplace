export const getUser = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/mp/users/${token}`
  );

  if (!res.ok) throw new Error();
  const userData = await res.json();
  const capsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/mp/users/${token}/caps`
  );

  let capsData = null;
  if (capsResponse.ok) {
    capsData = await capsResponse.json();
  }

  return { ...userData, ...capsData };
};

export const getProfile = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/mp/users/${id}`
  );

  if (!res.ok) throw new Error();

  return await res.json();
};

export const getAccountBalance = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/mp/users/${id}/caps`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();
  return data.capsAmout;
};

export const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/users`);

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data.docs;
};

export const patchUser = async (user: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/users/patch`,{
    body: JSON.stringify(user),
    headers: {
    'Content-Type' : 'application/json'
    },
    method: 'PATCH'
  });

  if (!res.ok) throw new Error();
  const userData = await res.json();
  return userData;
};
