import { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
} from 'react-bootstrap'

dayjs.extend(localizedFormat)


/**
 * Get the API URL
 * @param path 
 * @returns 
 */
const getAPIURL = (path: string = '' ) => {
  const paths = [ 
    process.env.REACT_APP_API_URL || 'http://localhost:3000',
    path.replace(/^\//, '')
  ]
  return paths.filter(Boolean).join('/')
}

/**
 * The API response type
 */
interface StripeTOPCustomer {
  amount_paid: number;
  currency?: string;
  created?: string;
  charges: Array<{
    amount: number;
    created: number;
    currency: string;
    description: string;
    status: string;
  }>
}


function App() {
  const [customers, setCustomers] = useState<StripeTOPCustomer[]>([]) 

  /**
   * Fetch API to load customers
   */
  useEffect(() => {
    fetch(getAPIURL('top_customers'))
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        setCustomers(json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }, [])

  /**
   * Define Table columns settings
   */
  const columns = useMemo(() => {
    return [{
      Header: 'Customer',
      columns: [{
        Header: 'Email',
        accessor: 'email'
      }, {
        Header: 'Amount paid',
        accessor: (d: StripeTOPCustomer) => {
          const amountPaid = d.amount_paid
          const currency = (() => {
            if (d.currency) return d.currency
            const charge = d.charges ? d.charges[0]: null
            if (!charge) return ''
            return charge.currency
          })()
          if (!amountPaid) return `${amountPaid} ${currency?.toLocaleUpperCase()}`
          return `${amountPaid.toLocaleString()} ${currency?.toLocaleUpperCase()}`
        },
        Cell: ({value}: any) => value
      }, {
        Header: 'Created',
        accessor: (d: StripeTOPCustomer) => d.created ? new Date(d.created) : 0,
        Cell: ({value}: any) => (value ? dayjs.unix(value).format('YYYY/MM/DD') : ''),
      }]
    }, {
      Header: 'Last order',
      columns: [{
        Header: 'Last order date',
        accessor: (d: StripeTOPCustomer) => {
          const charge = d.charges ? d.charges[0]: null
          if (!charge) return '-'
          return new Date(charge.created)
        },
        Cell: ({value}: any) => (value ? dayjs.unix(value).format('YYYY/MM/DD') : ''),
      }, {
        Header: 'Last order Status',
        accessor: (d: StripeTOPCustomer) => {
          const charge = d.charges ? d.charges[0]: null
          if (!charge) return '-'
          return charge.status
        },
        Cell: ({value}: any) => value
      }, {
        Header: 'Last ordered item',
        accessor: (d: StripeTOPCustomer) => {
          const charge = d.charges ? d.charges[0]: null
          if (!charge) return '-'
          return charge.description
        },
        Cell: ({value}: any) => value

      }]
    }]
  }, [])

  /**
   * Configure Table
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: customers,
  }, useSortBy)

  return (
    <div className="App">
      <Table striped bordered hover responsive size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps((column as any).getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {(column as any).isSorted
                      ? (column as any).isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
