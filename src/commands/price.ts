import type { Arguments, CommandBuilder } from 'yargs';
import { getPrice } from '../helpers/getPrice';

type Options = {
  crypto: string;
  verbose: boolean | undefined;
  amount: number | undefined;
};

export const command: string = 'price <crypto>';
export const desc: string = 'Fetch <crypto> price from coinbase';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      verbose: { type: 'boolean' },
      amount: { type: 'number' },
    })
    .positional('crypto', { type: 'string', demandOption: true });

export const handler = async (argv: Arguments<Options>) => {
  const { crypto, amount, verbose } = argv;

  console.log('\n');
  const greeting = `Fetching latest price for ${crypto}...\n`;
  process.stdout.write(greeting);

  return new Promise((resolve) => {
    // @ts-ignore
    return getPrice(crypto, verbose).then((latestPrice: number | undefined) => {
      console.log('LATEST PRICE!', latestPrice);
      // const latestPrice: number | undefined = await getPrice;
      if (!latestPrice) return resolve(false);

      if (amount) {
        const totalCost = latestPrice * amount;
        console.log(
          `${amount} x ${crypto} ($${latestPrice} USD) = $${totalCost} `
        );
      } else {
        console.log(`${crypto} ($${latestPrice} USD)`);
      }
      console.log('\n');
      return resolve(true);
    });

    // }, 1000);
  });
};
