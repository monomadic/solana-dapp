import {
    Keypair,
    Connection,
    PublicKey,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
    clusterApiUrl,
} from '@solana/web3.js';

import {
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { compute_rest_props } from 'svelte/internal';

const network = clusterApiUrl("mainnet-beta");
const connection = new Connection(network);
const providerUrl = 'https://www.sollet.io';

export async function sayHello(programId: PublicKey, targetPubKey: PublicKey, connection: Connection, payer: Keypair): Promise<void> {
    console.log('Saying hello to', targetPubKey.toBase58());

    const instruction = new TransactionInstruction({
        keys: [{ pubkey: targetPubKey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.alloc(0), // All instructions are hellos
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [payer],
    );
}

// export async function getSPLBalance(programId: PublicKey, connection: Connection) {
//     let resp = await connection.getProgramAccounts(programId, {
//         commitment: connection.commitment,
//         filters,
//     });
// }

export async function getTokenAccountsForWallet(pubKey: string) {
    console.log(TOKEN_PROGRAM_ID);
    let resp = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
        commitment: connection.commitment,
        filters: [
            { dataSize: 165 },
            {
                memcmp: {
                    offset: 32, // owner metadata is 32 bytes offset
                    bytes: pubKey,
                }
            },
        ]
    });

    return resp;
}