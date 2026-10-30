type Player = {
	account: {
		puuid: string
		region: string
		account_level: number
		name: string
		tag: string
		card?:
			string | { small?: string; large?: string; wide?: string; id?: string }
		last_update?: string
	}
	mmr: {
		current_data?: {
			currenttier?: number
			currenttierpatched?: string
			ranking_in_tier?: number
			elo?: number
			mmr_change_to_last_game?: number
			games_needed_for_rating?: number
		}
		highest_rank?: { patched_tier?: string; season?: string }
	} | null
}

export type { Player as default }
