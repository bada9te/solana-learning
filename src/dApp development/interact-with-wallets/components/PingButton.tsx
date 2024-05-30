import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from "@solana/web3.js";


export const PingButton: FC = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

    const onClick = () => {
        console.log('Ping!')

		if (!connection || !publicKey) {
			return;
			console.log("Wallet is not connected");
		}

		const programId = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
		const programDataId = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");
		const tx = new web3.Transaction();

		const txInstruction = new web3.TransactionInstruction({
			keys: [
				{
					pubkey: programDataId,
					isSigner: false,
					isWritable: true,
				},
			],
			programId,
		});

		tx.add(txInstruction);

		sendTransaction(tx, connection).then((signature) => {
			console.log(signature);
		});
	}
    
	return (
		<div className={styles.buttonContainer} onClick={onClick}>
			<button className={styles.button}>Ping!</button>
		</div>
	)
}

