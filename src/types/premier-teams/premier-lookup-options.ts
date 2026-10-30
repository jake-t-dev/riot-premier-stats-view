import type LookupOptions from '../api/lookup-options'

type PremierTeamLookupOptions = LookupOptions<{
	name: string
	tag: string
}>

export type { PremierTeamLookupOptions as default }
