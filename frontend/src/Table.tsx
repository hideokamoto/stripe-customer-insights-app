import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import dayjs from "dayjs";
import { Form, Table, FormControl, InputGroup } from "react-bootstrap";
import { StripeTOPCustomer } from "./interfaces";
import { useState } from "react";

export function CustomerTable({
  customers,
}: {
  customers: StripeTOPCustomer[];
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
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
   * Filter custom conditions
   */
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      if (name) {
        if (!customer.metadata || !customer.metadata.name) return false;
        const result = new RegExp(`${name}`, "ig").test(customer.metadata.name);
        if (!result) return false;
        if (!company) return true;
      }
      if (company) {
        if (!customer.metadata || !customer.metadata.company) return false;
        const result = new RegExp(`${company}`, "ig").test(
          customer.metadata.company
        );
        if (!result) return false;
        if (!email) return true;
      }
      if (email) {
        const result = new RegExp(`${email}`, "ig").test(customer.email);
        if (!result) return false;
        return true;
      }
      return true;
    });
  }, [customers, name, company, email]);

  /**
   * Configure Table
   */
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: filteredCustomers,
      },
      useSortBy
    );

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Label>Filter customer data</Form.Label>
        <Form.Row>
          <Form.Group className="mr-3">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Search by email</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="text"
                value={email}
                onChange={({ target: { value } }) => {
                  setEmail(value);
                }}
                placeholder="email address"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mr-3">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Search by name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="text"
                value={name}
                onChange={({ target: { value } }) => {
                  setName(value);
                }}
                placeholder="customer name"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Search by company</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="text"
                value={company}
                onChange={({ target: { value } }) => {
                  setCompany(value);
                }}
                placeholder="company name"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </Form>
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
