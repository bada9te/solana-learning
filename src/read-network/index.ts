import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
require("dotenv").config();

const publicKey = new PublicKey(process.env.SOL_PUBLIC_KEY as string);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log("Account:", await connection.getParsedAccountInfo(publicKey));
console.log("Balance in SOL:", balanceInSOL);