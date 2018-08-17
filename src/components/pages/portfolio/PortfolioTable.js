import React from 'react'
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core/es'
import NumberFormat from 'react-number-format'

export function PortfolioTable(props) {

  function createTable() {
    let table = []
    props.data.forEach(stock => {
      table.push(<TableRow key={stock.symbol}>
        <TableCell>{stock.symbol}</TableCell>
        <TableCell>{stock.exchange}</TableCell>
        <TableCell>{stock.currency}</TableCell>
        <TableCell>{stock.shares}</TableCell>
        <TableCell>
          <NumberFormat value={stock.bookCost} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        </TableCell>
        <TableCell>
          <NumberFormat value={stock.marketValue} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        </TableCell>
        <TableCell>
          <NumberFormat value={stock.unrealisedGains} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        </TableCell>
      </TableRow>)
    })
    return table
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Exchange</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Book Cost</TableCell>
            <TableCell>Market Value</TableCell>
            <TableCell>Unrealised Gains</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createTable()}
        </TableBody>
      </Table>
    </Paper>
  )
}
