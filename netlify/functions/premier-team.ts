import type { Handler } from '@netlify/functions'

const uuidPattern =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const affinities = new Set(['na', 'eu', 'ap', 'kr', 'br', 'latam'])

const jsonResponse = (statusCode: number, body: unknown) => ({
	statusCode,
	headers: {
		'Cache-Control': 'no-store',
		'Content-Type': 'application/json; charset=utf-8',
	},
	body: JSON.stringify(body),
})

const handler: Handler = async (event) => {
	if (event.httpMethod !== 'GET') {
		return jsonResponse(405, { errors: [{ message: 'Method not allowed' }] })
	}

	const params = event.queryStringParameters ?? {}
	const id = params.id?.trim()
	const name = params.name?.trim()
	const tag = params.tag?.trim()
	const season = params.season?.trim()
	const affinity = params.affinity?.trim().toLowerCase()

	if (id && !uuidPattern.test(id)) {
		return jsonResponse(400, { errors: [{ message: 'Invalid team id' }] })
	}

	if (!id && (!name || !tag || name.length > 100 || tag.length > 100)) {
		return jsonResponse(400, {
			errors: [{ message: 'Valid team name and tag are required' }],
		})
	}

	if (season && season.length > 100) {
		return jsonResponse(400, {
			errors: [{ message: 'Invalid season' }],
		})
	}

	if (affinity && !affinities.has(affinity)) {
		return jsonResponse(400, {
			errors: [{ message: 'Invalid affinity' }],
		})
	}

	const apiKey = process.env.RIOT_DEV_API_KEY
	if (!apiKey) {
		return jsonResponse(500, {
			errors: [{ message: 'Premier API is not configured' }],
		})
	}

	const upstreamParams = new URLSearchParams()
	if (season) upstreamParams.set('season', season)
	if (affinity) upstreamParams.set('affinity', affinity)

	const query = upstreamParams.size > 0 ? `?${upstreamParams.toString()}` : ''
	const upstreamResponse = await fetch(
		`https://api.henrikdev.xyz/valorant/v1/premier/${id ? encodeURIComponent(id) : `${encodeURIComponent(name ?? '')}/${encodeURIComponent(tag ?? '')}`}${query}`,
		{
			headers: {
				Authorization: apiKey,
			},
		},
	)

	return {
		statusCode: upstreamResponse.status,
		headers: {
			'Cache-Control': 'no-store',
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: await upstreamResponse.text(),
	}
}

// oxlint-disable-next-line import/no-named-export -- Netlify requires a named handler export.
export { handler }
