import type { Handler } from '@netlify/functions'

const uuidPattern =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

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
	const name = params.name?.trim()
	const tag = params.tag?.trim()
	const puuidParam = params.puuid?.trim()

	if (name || tag) {
		if (!name || !tag || name.length > 100 || tag.length > 100) {
			return jsonResponse(400, {
				errors: [{ message: 'Valid player name and tag are required' }],
			})
		}
	} else if (!puuidParam || !uuidPattern.test(puuidParam)) {
		return jsonResponse(400, {
			errors: [{ message: 'Valid puuid or name and tag are required' }],
		})
	}

	const apiKey = process.env.RIOT_DEV_API_KEY
	if (!apiKey) {
		return jsonResponse(500, {
			errors: [{ message: 'Player API is not configured' }],
		})
	}

	const headers = { Authorization: apiKey }
	const base = 'https://api.henrikdev.xyz/valorant'

	const accountResponse = await fetch(
		name && tag
			? `${base}/v2/account/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`
			: `${base}/v2/by-puuid/account/${encodeURIComponent(puuidParam ?? '')}`,
		{ headers },
	)
	if (!accountResponse.ok) {
		const body = await accountResponse.text()
		try {
			JSON.parse(body)
		} catch {
			return jsonResponse(accountResponse.status, {
				errors: [
					{
						message:
							body || accountResponse.statusText || 'Upstream request failed',
					},
				],
			})
		}

		return {
			...jsonResponse(accountResponse.status, null),
			body,
		}
	}

	const account = (
		(await accountResponse.json()) as {
			data?: { region?: string; puuid?: string }
		}
	).data

	const puuid = account?.puuid ?? puuidParam ?? ''

	let mmr: unknown = null
	if (account?.region) {
		const mmrResponse = await fetch(
			`${base}/v2/by-puuid/mmr/${encodeURIComponent(account.region)}/${encodeURIComponent(puuid)}`,
			{ headers },
		)
		if (mmrResponse.ok) {
			mmr = ((await mmrResponse.json()) as { data?: unknown }).data ?? null
		}
	}

	return jsonResponse(200, { status: 200, data: { account, mmr } })
}

// oxlint-disable-next-line import/no-named-export -- Netlify requires a named handler export.
export { handler }
