export const getNFTholders = (address) => {};
export const FractxTokenReserve = async (chain) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/block_v2/latest/?quote-currency=USD&format=JSON&key=ckey_e22bfa8a9c734c1e816244b1529`
  );
  const data = await res.json();
  return JSON.parse(JSON.stringify(data)).data.items.length;
};
export const getTokenSupply = (address) => {};
export const getTokenHolders = async (address, chain) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/tokens/${address}/token_holders/?quote-currency=USD&format=JSON&key=ckey_e22bfa8a9c734c1e816244b1529`
  );
  const data = await res.json();
  return JSON.parse(JSON.stringify(data)).data.items.length;
};
export const getBlockHeight = async (chain) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/block_v2/latest/?quote-currency=USD&format=JSON&key=ckey_e22bfa8a9c734c1e816244b1529`
  );
  const data = await res.json();
  return JSON.parse(JSON.stringify(data)).data.items[0].height;
};
