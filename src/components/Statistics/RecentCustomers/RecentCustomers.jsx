import css from "./RecentCustomers.module.css";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo } from "react";
import { openModal } from "../../../redux/modal/slice";
import { selectActiveModal } from "../../../redux/modal/selectors";
import OrderModal from "../Order/Order";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import {
  selectedClient,
  selectError,
  selectLoading,
} from "../../../redux/statistics/selectors";

export default function RecentCustomers({ clients }) {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const activeModal = useSelector(selectActiveModal);

  const handleOrder = (client) => {
    dispatch(openModal({ type: "order", client }));
    console.log("client**", client);
  };

  if (!clients || clients.length === 0) {
    return <div className={css.customersBlock}>
      <h3 className={css.customersTitle}>RecentCustomers </h3>
      <div className={css.tablePosition}>
      </div>
      </div>
  }
  const [
    {
      clientName,
      clientEmail,
      total,
      client: { _id, phone },
    },
  ] = clients;

  const columns = useMemo(
    () => [
      {
        accessorKey: "clientName",
        header: () => (
          <div className={css.columTitleName}>
            <h3 className={css.columTitle}>Name</h3>
          </div>
        ),
      },
      {
        accessorKey: "clientEmail",
        header: () => (
          <div className={css.columTitleName}>
            <h3 className={css.columTitle}>Email</h3>
          </div>
        ),
      },
      {
        accessorKey: "total",
        header: () => (
          <div className={css.columTitleName}>
            <h3 className={css.columTitle}>Spent</h3>
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: "Medicine",
        cell: ({ row }) => (
          <button
            className={css.tableBtn}
            onClick={() => handleOrder(row.original)}
          >
            View
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () => clients.filter((client) => client.clientName),
    [clients]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={css.customersBlock}>
      <h3 className={css.customersTitle}>RecentCustomers </h3>
      <div className={css.tablePosition}>
        {clients.length > 0 && (
          <table className={css.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={css.tableRow}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className={css.head}>
                      {typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header()
                        : header.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={css.tableRow}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={css.cell}>
                      {cell.column.columnDef.cell
                        ? cell.column.columnDef.cell(cell)
                        : cell.getValue()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isError && <ErrorMessage />}

        {activeModal?.type === "order" && (
          <OrderModal client={activeModal.client} />
        )}
      </div>
    </div>
  );
}
