use anchor_lang::prelude::*;

declare_id!("45oMHdigCaVCYhFTAk3ntLyVskCSqDKK7LgiLEwsoB8z");

#[program]
pub mod anchor_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
