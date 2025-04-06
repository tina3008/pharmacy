import css from "./IncomeExpenses.module.css";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Alert, AlertAmount } from "../Alert/Alert";
import { PaginatedItems } from "../../PaginatedItems/PaginatedItems";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";


export default function IncomeExpenses({ moneys, totalPage, currentPage }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "type",
        cell: (cell) => {
          const value = cell.getValue();
          return <Alert variant={value}>{value}</Alert>;
        },
      },
      {
        accessorKey: "name",
        cell: (cell) => {
          const value = cell.getValue();
          return <div className={css.middleCell}>{value}</div>;
        },
      },
      {
        accessorKey: "amount",
        cell: (cell) => {
          const row = cell.row.original;
          const type = row.type?.toLowerCase();

          return <AlertAmount type={type}>{cell.getValue()}</AlertAmount>;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: moneys,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={css.customersBlock}>
      <h3 className={css.customersTitle}>Income/Expenses </h3>
      <div className={css.tablePosition}>
        <h4 className={css.dayTitle}>Today </h4>
        <table className={css.table}>
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
      </div>
       
    </div>
  );
}
