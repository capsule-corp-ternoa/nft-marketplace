export const getCapsValue = async () => {
  const result = await fetch(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=CAPS',
    {
      headers: new Headers({
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY as string,
      }),
    }
  );
  if (!result.ok) throw new Error();
  const { price } = (await result.json()).data.CAPS.quote.USD;
  return price;
};
