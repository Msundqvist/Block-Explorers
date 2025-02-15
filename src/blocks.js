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
}


const getBalance = async () => {
    const balance = await client.getBalance({
        adress: '0x6cC8Fc8161A4840cB293855acF342353b0869203'

    });
    subTitle.innerText = `Current Balance : ${parseFloat(formatEther(balance).toFixed(2))}`
}

const listAllBlocks = () => {

}
document.addEventListener('DOMContentLoaded', initApp)