import { createClient } from './helpers/client.js';
import { getBlock } from 'https://esm.sh/viem/actions';
import { generateBlockInfo, generateDisplay } from './dom.js';

let client = undefined;

const initApp = () => {
    const hash = location.search.split('=')[1];
    client = createClient()

    displayTransactionDetails(hash);
};


const displayTransactionDetails = async (hash) => {
    const block = await client.getBlock({ blockHash: hash });

    generateBlockInfo(block);

    for (let trx of block.transactions) {
        const transaction = await client.getTransaction({
            hash: trx,
        });

    }
};


document.addEventListener('DOMContentLoaded', initApp);
