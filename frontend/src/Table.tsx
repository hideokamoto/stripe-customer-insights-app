import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import dayjs from "dayjs";
import { Table } from "react-bootstrap";
import { StripeTOPCustomer } from "./interfaces";

export function CustomerTable({
  customers,
}: {
  customers: StripeTOPCustomer[];
}) {
  /**
   * Define Table columns settings
   */
  const columns = useMemo(() => {
    return [
      {
        Header: "Customer",
        columns: [
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "Company",
            accessor: (d: StripeTOPCustomer) => {
              if (d.metadata && d.metadata.company) {
                return d.metadata.company;
              }
              return "-";
            },
            Cell: ({ value }: any) => value,
          },
          {
            Header: "Name",
            accessor: (d: StripeTOPCustomer) => {
              if (d.metadata && d.metadata.name) {
                return d.metadata.name;
              }
              return "-";
            },
            Cell: ({ value }: any) => value,
          },
          {
            Header: "Customer source",
            accessor: (d: StripeTOPCustomer) => {
              if (d.metadata && d.metadata.customer_source) {
                return d.metadata.customer_source;
              }
              return "-";
            },
            Cell: ({ value }: any) => {
              return value.replace("_", " ");
            },
          },
          {
            Header: "Amount paid",
            accessor: (d: StripeTOPCustomer) => {
              const amountPaid = d.amount_paid;
              const currency = (() => {
                if (d.currency) return d.currency;
                const charge = d.charges ? d.charges[0] : null;
                if (!charge) return "";
                return charge.currency;
              })();
              if (!amountPaid)
                return `${amountPaid} ${currency?.toLocaleUpperCase()}`;
              return `${amountPaid.toLocaleString()} ${currency?.toLocaleUpperCase()}`;
            },
            Cell: ({ value }: any) => value,
          },
          {
            Header: "Created",
            accessor: (d: StripeTOPCustomer) =>
              d.created ? new Date(d.created) : 0,
            Cell: ({ value }: any) =>
              value ? dayjs.unix(value).format("YYYY/MM/DD") : "",
          },
        ],
      },
      {
        Header: "Last order",
        columns: [
          {
            Header: "Last order date",
            accessor: (d: StripeTOPCustomer) => {
              const charge = d.charges ? d.charges[0] : null;
              if (!charge) return "-";
              return new Date(charge.created);
            },
            Cell: ({ value }: any) =>
              value ? dayjs.unix(value).format("YYYY/MM/DD") : "",
          },
          {
            Header: "Last order Status",
            accessor: (d: StripeTOPCustomer) => {
              const charge = d.charges ? d.charges[0] : null;
              if (!charge) return "-";
              return charge.status;
            },
            Cell: ({ value }: any) => value,
          },
          {
            Header: "Last ordered item",
            accessor: (d: StripeTOPCustomer) => {
              const charge = d.charges ? d.charges[0] : null;
              if (!charge) return "-";
              return charge.description;
            },
            Cell: ({ value }: any) => value,
          },
        ],
      },
    ];
  }, []);

  /**
   * Configure Table
   */
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: customers,
      },
      useSortBy
    );

  return (
    <Table striped bordered hover responsive size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(
                  (column as any).getSortByToggleProps()
                )}
              >
                {column.render("Header")}
                <span>
                  {(column as any).isSorted
                    ? (column as any).isSortedDesc
                      ? " 🔽"
                      : " 🔼"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
