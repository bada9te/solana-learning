use anchor_lang::prelude::*;

declare_id!("5RxR5UAbY8zXiCPrCXU77wQMJ2QKxNdhzT1xFVuAmCPA");

#[program]
pub mod anchor_movie_review_program {
    use super::*;

    // create
    pub fn add_review(
        ctx: Context<AddMovieReview>,
        title: String,
        description: String,
        rating: u8,
    )-> Result<()> {
        msg!("Movie review Account created.");
        msg!("Title: {}", title);
        msg!("Description: {}", description);
        msg!("Rating: {}", rating);

        let movie_review = &mut ctx.accounts.movie_review;
        movie_review.reviewer = ctx.accounts.initializer.key();
        movie_review.rating = rating;
        movie_review.title = title;
        movie_review.description = description;

        Ok(())
    }

    // update
    pub fn update_review(
        ctx: Context<UpdateMovieReview>,
        title: String,
        description: String,
        rating: u8,
    ) -> Result<()> {
        msg!("Movie review space reallocated!");
        msg!("Title: {}", title);
        msg!("Description: {}", description);
        msg!("Rating: {}", rating);

        let movie_review = &mut ctx.accounts.movie_review;
        movie_review.description = description;
        movie_review.rating = rating;

        Ok(())
    }

    // delete
    pub fn delete_review(
        _ctx: Context<DeleteMovieReview>,
        title: String,
    ) -> Result<()> {
        msg!("Movie review for {} deleted", title);

        Ok(())
    }


    
}

// MOVIE REVIEW ENTITY
#[account]
pub struct MovieAccountState {
    pub reviewer: Pubkey, // 32
    pub rating: u8, // 1
    pub title: String, // 4 + len()
    pub description: String // 4 + len()
}

// ADD STRUCTURE
#[derive(Accounts)]
#[instruction(title: String, description: String)]
pub struct AddMovieReview<'info> {
    #[account(
        init,
        seeds = [title.as_bytes(), initializer.key().as_ref()],
        bump,
        payer = initializer,
        space = 8 + 32 + 1 + 4 + title.len() + 4 + description.len()
    )]
    pub movie_review: Account<'info, MovieAccountState>,

    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// UPDATE STRUCTURE
#[derive(Accounts)]
#[instruction(title: String, description: String)]
pub struct UpdateMovieReview<'info> {
    #[account(
        mut,
        seeds = [title.as_bytes(), initializer.key().as_ref()],
        bump,
        realloc = 8 + 32 + 1 + 4 + title.len() + 4 + description.len(),
        realloc::payer = initializer,
        realloc::zero = true,
    )]
    pub movie_review: Account<'info, MovieAccountState>,

    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// DELETE STRUCTURE
#[derive(Accounts)]
#[instruction(title: String)]
pub struct DeleteMovieReview<'info> {
    #[account(
        mut,
        seeds = [title.as_bytes(), initializer.key().as_ref()],
        bump,
        close = initializer,
    )]
    pub movie_review: Account<'info, MovieAccountState>,

    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
