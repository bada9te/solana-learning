import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import { FC, useEffect, useState } from "react"
import idl from "../idl.json"
import { Button } from "@chakra-ui/react"
import { Keypair } from "@solana/web3.js"

const PROGRAM_ID = new anchor.web3.PublicKey(
  `9pbyP2VX8Rc7v4nR5n5Kf5azmnw5hHfkJcZKPHXW98mf`
)

export interface Props {
  setCounter
  setTransactionUrl
}

const newAccount = Keypair.generate();



export const Initialize: FC<Props> = ({ setCounter, setTransactionUrl }) => {
  const [program, setProgram] = useState<anchor.Program<anchor.Idl> | null>(null);
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const onClick = async () => {
    const signature = await program.methods
      .initialize()
      .accounts({
        counter: newAccount.publicKey,
        user: wallet.publicKey,
        systemAccount: anchor.web3.SystemProgram.programId
      })
      .signers([newAccount])
      .rpc();

    setTransactionUrl(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    setCounter(newAccount.publicKey);
  }

  useEffect(() => {
    let provider: anchor.Provider;

    try {
      provider = anchor.getProvider();
    } catch (error) {
      provider = new anchor.AnchorProvider(connection, wallet, {});
      anchor.setProvider(provider);
    }

    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID);
    setProgram(program);
  }, []);

  return <Button onClick={onClick}>Initialize Counter</Button>
}
