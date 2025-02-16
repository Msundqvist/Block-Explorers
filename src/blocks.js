import { createPublicClient, http, formatEther } from 'https://esm.sh/viem';
import { localhost, sepolia } from 'https://esm.sh/viem/chains';
import { getBlock } from 'https://esm.sh/viem/actions';
import { createElement, createTextElement } from './dom.js';
const blockList = document.querySelector('#list')
const subTitle = document.querySelector('h4')

let client = undefined;

const initApp = async () => {
    client = createPublicClient({
        chain: localhost,
        transport: http('http://localhost:7545'),
    });
    getBalance();
    listAllBlocks();
}


const getBalance = async () => {
    const balance = await client.getBalance({
        address: '0xC963cF7168C721c186908eA19BCd5E5cB608F142',
    });

    subTitle.innerText = `Current Balance: ${parseFloat(
        formatEther(balance)
    ).toFixed(2)}`;
};


const listAllBlocks = async () => {
    const blocks = await client.getBlockNumber();
    console.log('Antal block', blocks);

    for (let i = blocks; i >= 0; i--) {
        // hämta block med blocknummer
        const block = await client.getBlock({ blockNumber: i });
        console.log(block)

        // generera html
        const div = createElement('div');
        div.classList.add('section');

        // lägg till blocknmmer
        div.appendChild(createTextElement('div', block.number));
        //blockhash
        div.appendChild(createTextElement('div', block.hash));
        div.appendChild(createTextElement('div', block.gasUsed));
        div.appendChild(createTextElement('div', new Date(parseInt(block.timestamp * 1000n)).toLocaleString()
        )
        )

        blockList.appendChild(div)
    }
}
document.addEventListener('DOMContentLoaded', initApp)