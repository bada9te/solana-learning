import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
require("dotenv").config();
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";


// basic setup
const suppliedToPublicKey = process.argv[2] || null;

if (!suppliedToPublicKey) {
    console.log("Public key was not provided as argv[2]");
    process.exit(1);
}

const senderKEYPAIR = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPublickey: ${suppliedToPublicKey}`);

const toPublicKey = new PublicKey(suppliedToPublicKey);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("[OK] Loaded keypair, dest public key, connected to network!");


// create TX
const tx = new Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSOLInstruction = SystemProgram.transfer({
    fromPubkey: senderKEYPAIR.publicKey,
    toPubkey: toPublicKey,
    lamports: LAMPORTS_TO_SEND,
});

tx.add(sendSOLInstruction);

if (await connection.getBalance(senderKEYPAIR.publicKey) == 0) {
    console.log("[WARN] Not enough funds, requesting an airdrop...");
    await airdropIfRequired(
        connection,
        senderKEYPAIR.publicKey,
        1 * LAMPORTS_PER_SOL,
        0.5 * LAMPORTS_PER_SOL,
    );
}

const signature = await sendAndConfirmTransaction(
    connection, 
    tx,
    [senderKEYPAIR]
);

console.log(`[DONE] Sent ${LAMPORTS_TO_SEND} to the publicKey: ${toPublicKey}`);
console.log(`[SIGNATURE] ${signature}`);
