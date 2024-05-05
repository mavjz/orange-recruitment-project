import { main } from './main';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const start = () => {
    const y = yargs(hideBin(process.argv))
        .options('x', {
            alias: 'numberOfIteration',
            describe: `Number of iterations of GET requests to run (defalut: 10)`,
            demandOption: false,
            type: 'number',
            default: 10,
        })
        .option('y', {
            alias: 'intervalBetweenIteration',
            describe: `Interval in seconds between each iteration (defalut: 5)`,
            demandOption: false,
            type: 'number',
            default: 5,
        });
    const options = y.parseSync();
    main(options);
};

start();
