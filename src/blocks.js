import { formatEther } from 'https://esm.sh/viem';
import { getBlock } from 'https://esm.sh/viem/actions';
import { createClient } from './helpers/client.js';
import { createElement, createTextElement } from './dom.js';
const blockList = document.querySelector('#list')
const subTitle = document.querySelector('h4')
const showBlockNumber = document.querySelector('#blockNumber')

let client = undefined;

const initApp = async () => {
    client = createClient();
    getBalance();
    listAllBlocks();
    showBlockNumbers();

}


const getBalance = async () => {
    const balance = await client.getBalance({
        address: '0xC963cF7168C721c186908eA19BCd5E5cB608F142',
    });

    subTitle.innerText = `Current Balance: ${parseFloat(
        formatEther(balance)
    ).toFixed(2)}`;
};

const showBlockNumbers = async () => {
    const block = await client.getBlockNumber();

    const div = createElement('div');
    const heading = createElement('h4')
    heading.innerText = `Aktuellt blocknummer: ${block}`

    div.appendChild(heading)
    showBlockNumber.appendChild(div)

}


const listAllBlocks = async () => {
    const blocks = await client.getBlockNumber();


    for (let i = blocks; i >= 0; i--) {
        const block = await client.getBlock({ blockNumber: i });

        const div = createElement('div');

        div.classList.add('section');

        div.appendChild(createTextElement('div', block.number));
        div.appendChild(createTextElement('div', block.hash));
        div.appendChild(createTextElement('div', block.gasUsed));
        div.appendChild(createTextElement('div', new Date(parseInt(block.timestamp * 1000n)).toLocaleString('sv-SE')
        )
        );

        const button = createElement('a');
        button.innerText = 'Show';
        button.classList.add('btn');
        button.classList.add('btn-rounded');
        button.style.width = '100px';
        button.href = `../pages/transaction.html?hash=${block.hash}`;

        div.appendChild(button)


        blockList.appendChild(div)

    }

}
document.addEventListener('DOMContentLoaded', initApp)