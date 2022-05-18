export const getNFTholders = (address) => {};

export const getTokenBalance = async (
  address,
  chain,
  paticularTokenaddress
) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_e22bfa8a9c734c1e816244b1529`
  );
  const data = await res.json();
  const tokenBalance = JSON.parse(JSON.stringify(data)).data.items;
  for (var i = 0; i < tokenBalance.length; i++) {
    if ((tokenBalance[i].contract_address = paticularTokenaddress)) {
      return tokenBalance[i].balance;
    }
  }
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

export const getNFTHolders = async (address, chain) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/tokens/${address}/token_holders/?quote-currency=USD&format=JSON&key=ckey_e22bfa8a9c734c1e816244b1529`
  );
  const data = await res.json();
  return JSON.parse(JSON.stringify(data)).data.items.length;
};
