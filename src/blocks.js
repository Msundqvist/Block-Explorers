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
        transport: http("http://localhost:7545")
    })
    const balance = await client.getBalance({
        adress: '0xC963cF7168C721c186908eA19BCd5E5cB608F142'

    })
    subTitle.innerText = `Current Balance : ${balance}`
}

const listAllBlocks = () => {

}
document.addEventListener('DOMContentLoaded', initApp);