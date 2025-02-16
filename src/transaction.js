import { createClient } from './helpers/client.js';
import { generateDisplay } from './dom.js';


let client = undefined;

const initApp = () => {
    const hash = location.search.split('=')[1];
    client = createClient()

    displayTransactionDetails(hash);
};

const displayTransactionDetails = async (hash) => {
    const block = await client.getBlock({ blockHash: hash });

    if (block.transactions.length === 0) {
        generateDisplay(block);
        return;
    }

    for (let trx of block.transactions) {
        const transaction = await client.getTransaction({
            hash: trx,
        });
        generateDisplay(block, transaction);
    }
};

document.addEventListener('DOMContentLoaded', initApp);
