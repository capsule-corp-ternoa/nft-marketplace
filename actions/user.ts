export const getUser = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${token}`
  );

  if (!res.ok) throw new Error();
  const userData = await res.json();

  let capsData = { capsAmount: '0' };
  try {
    const capsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${token}/caps`
    );
    if (capsResponse.ok) {
      capsData = await capsResponse.json();
    }
  } catch (error) {
    console.error('Couldnt get this users caps balance');
  }

  return { ...userData, ...capsData };
};

export const getProfile = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API}/api/users/${id}`
  );

  if (!res.ok) throw new Error();

  return await res.json();
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
