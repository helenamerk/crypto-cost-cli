import request from 'request';

export const COINS = {
  BTC: '5b71fc48-3dd3-540c-809b-f8c94d0e68b5',
  ETH: 'd85dce9b-5b73-5c3c-8978-522ce1d1c1b4',
  SOL: '4f039497-3af8-5bb3-951c-6df9afa9be1c',
};

export const getPrice = async (coinName: string, verbose?: boolean) => {
  // @ts-ignore
  const coinId = COINS[coinName.toUpperCase()];
  if (!coinId) {
    console.log('Only ' + Object.values(COINS).join() + ' allowed');
    return undefined;
  }

  return new Promise((resolve) => {
    request(
      'https://www.coinbase.com/api/v2/assets/prices/' + coinId,
      { json: true },
      (err: any, res: any, body: any) => {
        if (err) {
          console.log('something went wrong');
          return resolve(undefined);
        }

        if (verbose) console.log(body.data.prices);

        const latestPrice = Number(body.data.prices.latest);
        resolve(latestPrice);
      }
    );
  });
};
