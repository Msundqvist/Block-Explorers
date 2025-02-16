import { createPublicClient, http, formatEther } from 'https://esm.sh/viem';
import { localhost, sepolia } from 'https://esm.sh/viem/chains';
const transactionDetailDisplay = document.querySelector('#transactionDetails');

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

const generateDisplay = (block, transaction) => {
    let html = '';
    transactionDetailDisplay.innerHTML = html;

    html = `
    <h2 id  ="blockNumber">Block Number: ${block.number}</h2>
    <article class="trx-details">
        <section>
            <span>Gas Used</span>
            <small>${block.gasUsed}</small>
        </section>
        <section>
            <span>Gas limit</span>
            <small>${block.gasLimit}</small>
        </section>
        <section>
            <span>Mined on</span>
            <small>${new Date(parseInt(block.timestamp * 1000n)).toLocaleString(
        'sv-SE')}
            </small>
        </section>
        <section>
            <span>Block hash</span>
            <small>${block.hash}</small>
        </section>
    </article>

    <h2 id ="trxHash">Tx Hash ${transaction.hash}</h2>
    <article class ="trx-details">
        <section>
            <span>From</span>
            <small>${transaction.from}</small>
        </section>
        <section>
            <span>To</span>
            <small>${transaction.to}</small>
        </section>
        <section>
            <span>Gas Used</span>
            <small>${transaction.gas}</small>
        </section>
        <section>
            <span>Value</span>
            <small>${parseFloat(formatEther(transaction.value)).toFixed(2)}ETH</small>
        </section >
    </article > `;

    transactionDetailDisplay.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', initApp);
