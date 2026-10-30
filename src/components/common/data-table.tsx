import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import type { ReactNode } from 'react'

type Column<Row> = {
	header: string
	render: (row: Row) => ReactNode
}

type DataTableProps<Row> = {
	columns: Column<Row>[]
	rows: Row[]
	getRowKey: (row: Row) => string
	onRowClick?: (row: Row) => void
}

const DataTable = <Row,>({
	columns,
	rows,
	getRowKey,
	onRowClick,
}: DataTableProps<Row>) => {
	return (
		<TableContainer component={Paper}>
			<Table size='small'>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell key={column.header}>{column.header}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={getRowKey(row)}
							hover={Boolean(onRowClick)}
							onClick={onRowClick && (() => onRowClick(row))}
							sx={onRowClick && { cursor: 'pointer' }}
						>
							{columns.map((column) => (
								<TableCell key={column.header}>{column.render(row)}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default DataTable
