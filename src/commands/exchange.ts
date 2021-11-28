import type { Arguments, CommandBuilder } from 'yargs';
import { getPrice } from '../helpers/getPrice';

type Options = {
  crypto: string;
  verbose: boolean | undefined;
  usd: number | undefined;
};

export const command: string = 'exchange <crypto>';
export const desc: string = 'Calculate <crypto> price from coinbase';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      verbose: { type: 'boolean' },
      usd: { type: 'number' },
    })
    .positional('crypto', { type: 'string', demandOption: true });

export const handler = async (argv: Arguments<Options>) => {
  const { crypto, usd, verbose } = argv;
  if (!usd) {
    console.log('Please add a --usd <number>');
    return;
  }

  console.log('\n');
  const greeting = `Fetching latest price for ${crypto}...\n`;
  process.stdout.write(greeting);

  return new Promise((resolve) => {
    // @ts-ignore
    return getPrice(crypto, verbose).then((latestPrice: number | undefined) => {
      if (!latestPrice) return resolve(false);

      const totalPurchaseable = usd / latestPrice;
      console.log(
        `$${usd} can buy you ${totalPurchaseable} at $${latestPrice}/${crypto}`
      );

      console.log('\n');
      return resolve(true);
    });

    // }, 1000);
  });
};
