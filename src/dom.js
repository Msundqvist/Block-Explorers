import { formatEther } from 'https://esm.sh/viem';
const transactionDetailDisplay = document.querySelector('#transactionDetails');


export const createElement = (elem) => {
    return document.createElement(elem);
};
export const createTextElement = (elem, text) => {
    const element = document.createElement(elem);
    element.appendChild(document.createTextNode(text));
    return element;
};

export const generateDisplay = (block, transaction) => {
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
