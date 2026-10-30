import { useState } from 'react'
import type { FormEvent } from 'react'
import { Box, Button, MenuItem, TextField } from '@mui/material'
import type Affinity from '../../types/common/affinity'
import type PremierTeamLookupOptions from '../../types/premier-teams/premier-lookup-options'

const affinities: Affinity[] = ['na', 'eu', 'ap', 'kr', 'br', 'latam']

const emptyLookup: PremierTeamLookupOptions = { name: '', tag: '' }

type TeamLookupFormProps = {
	onSearch: (lookup: PremierTeamLookupOptions) => void
}

const TeamLookupForm = ({ onSearch }: TeamLookupFormProps) => {
	const [form, setForm] = useState<PremierTeamLookupOptions>(emptyLookup)

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		onSearch({
			...form,
			name: form.name.trim(),
			tag: form.tag.trim(),
			season: form.season?.trim() || undefined,
		})
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
		>
			<TextField
				label='Team name'
				required
				value={form.name}
				onChange={(event) => setForm({ ...form, name: event.target.value })}
			/>
			<TextField
				label='Tag'
				required
				value={form.tag}
				onChange={(event) => setForm({ ...form, tag: event.target.value })}
			/>
			<TextField
				select
				label='Affinity'
				sx={{ minWidth: 120 }}
				value={form.affinity ?? ''}
				onChange={(event) =>
					setForm({
						...form,
						affinity: (event.target.value || undefined) as Affinity | undefined,
					})
				}
			>
				<MenuItem value=''>Any</MenuItem>
				{affinities.map((affinity) => (
					<MenuItem key={affinity} value={affinity}>
						{affinity.toUpperCase()}
					</MenuItem>
				))}
			</TextField>
			<TextField
				label='Season ID (optional)'
				value={form.season ?? ''}
				onChange={(event) => setForm({ ...form, season: event.target.value })}
			/>
			<Button type='submit' variant='contained'>
				Search
			</Button>
		</Box>
	)
}

export default TeamLookupForm
