import { createPublicClient, http } from 'https://esm.sh/viem';
import { localhost, sepolia } from 'https://esm.sh/viem/chains';
import { generateDisplay } from './dom.js';


let client = undefined;

const initApp = () => {
    const hash = location.search.split('=')[1];
    client = createPublicClient({
        chain: localhost,
        transport: http('http://localhost:7545'),
    });

    displayTransactionDetails(hash);
};

const displayTransactionDetails = async (hash) => {
    const block = await client.getBlock({ blockHash: hash });

    for (let trx of block.transactions) {
        const transaction = await client.getTransaction({
            hash: trx,
        });
        generateDisplay(block, transaction);
    }
};

document.addEventListener('DOMContentLoaded', initApp);
