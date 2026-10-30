import type Affinity from '../common/affinity'

type LookupOptions<TParams extends object> = TParams & {
	season?: string
	affinity?: Affinity
}

export type { LookupOptions as default }
