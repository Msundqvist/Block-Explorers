import { parseEther } from 'https://esm.sh/viem'
import { createWallet } from './helpers/client.js'


const form = document.querySelector('#transaction-form');
const fromInput = document.querySelector('#from')
const toInput = document.querySelector('#to')
const valueInput = document.querySelector('#value')

let client = undefined

const initApp = () => {
    client = createWallet();
}

const createTransactions = async (e) => {
    e.preventDefault();

    try {
        await client.sendTransaction({
            account: fromInput.value,
            to: toInput.value,
            value: parseEther(valueInput.value),
        });
        location.href = '../pages/blocks.html'

    } catch (error) {
        console.log(error)
    }


}
document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', createTransactions);