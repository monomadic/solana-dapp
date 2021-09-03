import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { pubKey } from '../stores/provider';

const network = clusterApiUrl("devnet");
// const connection = new Connection(network);
// const providerUrl = 'https://www.sollet.io';

declare let window: any;

export async function connect() {
    let provider = getPhantom();

    window.solana.on("connect", onConnect);

    provider.connect();
}

// fix typing.
function getPhantom(): any {
    if ("solana" in window) {
        const provider: any = (window as unknown as { solana: unknown }).solana;
        return provider;
    }
    // no provider, handle it
}

function onConnect() {
    pubKey.set(window.solana.publicKey.toString());
}
