export const getCapsValue = async () => {
  const result = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=coin-capsule&vs_currencies=usd')
  if (!result.ok) throw new Error()
  const price = (await result.json())['coin-capsule'].usd
  return price
}
