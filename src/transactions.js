import { createPublicClient, http, formatEther } from 'https://esm.sh/viem';
import { localhost } from 'https://esm.sh/viem/chains';
import { getBlock } from 'https://esm.sh/viem/actions';
import { createElement, createTextElement } from './dom.js';
const transactionList = document.querySelector('#list')

let client = undefined;

const initApp = () => {
    client = createPublicClient({
        chain: localhost,
        transport: http('http://localhost:7545')
    });
    listTransactions()
}

const listTransactions = async () => {
    const blocks = await client.getBlockNumber();

    for (let i = blocks; i >= 0; i--) {
        const block = await client.getBlock({ blockNumber: i })
        const transactions = block.transactions;
        console.log(transactions)
    }
};

document.addEventListener('DOMContentLoaded', initApp);