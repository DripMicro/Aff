import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  chakra,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
export type DataTableProps<Data extends object> = {
  data: Data[] | null | undefined;
  columns: ColumnDef<Data, any>[];
  footerData: any;
};

export function DataTable<Data extends object>({
  data,
  columns,
  footerData = [],
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [quickData, setQuickData] = React.useState([]);
  const [impressions, setImpressions] = React.useState([]);
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <Thead>
        {getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  // @ts-ignore
                  isNumeric={!!meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta = cell.column.columnDef.meta;
              return (
                <Td
                  key={cell.id}
                  // @ts-ignore
                  isNumeric={!!meta?.isNumeric}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
      {footerData && (
        <Tfoot>
          <Tr>
            <Td>Total</Td>
            {footerData.length > 0 &&
              Object.values(footerData[0]).map((item: any, key) => {
                return <Td key={key}>{item}</Td>;
              })}
          </Tr>
        </Tfoot>
      )}
    </Table>
  );
}
