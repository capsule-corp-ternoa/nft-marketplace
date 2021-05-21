export const getUser = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${token}`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
};

export const getProfile = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${id}`
  );

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data;
};

export const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/users`);

  if (!res.ok) throw new Error();

  const data = await res.json();

  return data.docs;
};
