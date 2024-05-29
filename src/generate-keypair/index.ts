import { Keypair } from "@solana/web3.js"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
require("dotenv").config()


const kp = Keypair.generate();
console.log('PUBLIC:', kp.publicKey);
console.log('PRIVATE:', kp.secretKey);


const kpEnv = getKeypairFromEnvironment("SECRET_KEY");
console.log('PUBLIC ENV:', kpEnv.publicKey);
console.log('PRIVATE ENV:', kpEnv.secretKey);