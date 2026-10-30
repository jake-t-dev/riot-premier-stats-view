import { useState } from 'react'
import type { FormEvent } from 'react'
import { Box, Button, TextField } from '@mui/material'

type PlayerLookupFormProps = {
	onSearch: (lookup: { name: string; tag: string }) => void
}

const PlayerLookupForm = ({ onSearch }: PlayerLookupFormProps) => {
	const [name, setName] = useState('')
	const [tag, setTag] = useState('')

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		onSearch({ name: name.trim(), tag: tag.trim().replace(/^#/, '') })
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
		>
			<TextField
				label='Player name'
				required
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			<TextField
				label='Tag'
				required
				value={tag}
				onChange={(event) => setTag(event.target.value)}
			/>
			<Button type='submit' variant='contained'>
				Search
			</Button>
		</Box>
	)
}

export default PlayerLookupForm
