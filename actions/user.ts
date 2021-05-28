export const getUser = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${token}`
  );

  if (!res.ok) throw new Error();

  const capsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${token}/caps`
  );

  if (!capsResponse.ok) throw new Error();
  const capsData = await capsResponse.json();

  const data = { ...(await res.json()), ...capsData };

  return data;
};

export const getProfile = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${id}`
  );

  if (!res.ok) throw new Error();

  const capsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${id}/caps`
  );

  if (!capsResponse.ok) throw new Error();
  const capsData = await capsResponse.json();

  const data = { ...(await res.json()), ...capsData };

  return data;
};

export const getAccountBalance = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${id}/caps`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();
  return data.capsAmout;
};

export const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/users`);

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data.docs;
};
