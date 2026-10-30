type PremierTeam = {
	id: string
	name: string
	tag: string
	enrolled: boolean
	ranked: boolean
	stats: {
		wins: number
		matches: number
		losses: number
		rounds_won: number
		rounds_lost: number
	}
	placement: {
		points: number
		conference: string
		division: number
		place: number
	}
	customization: {
		icon: string
		image: string
		primary: string
		secondary: string
		tertiary: string
	}
	member: {
		puuid: string
		name: string | null
		tag: string | null
	}[]
}

export type { PremierTeam as default }
