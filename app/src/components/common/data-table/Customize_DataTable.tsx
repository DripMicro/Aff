import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
  Stack,
  HStack,
  useDisclosure,
  Box,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import styles from "../../../pages/index.module.css";
import { QuerySelect } from "../QuerySelect";
import { QueryText } from "../QueryText";

export type DataTableProps<Data extends object> = {
  data: Data[] | null | undefined;
  columns: ColumnDef<Data, any>[];
  editRec: number;
  state: boolean;
};

export function CustomizeDataTable<Data extends object>({
  data,
  columns,
  editRec,
  state,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
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
    <div className=" scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 overflow-x-scroll  scrollbar-thumb-rounded-full scrollbar-track-rounded-full 3xl:overflow-x-hidden  mt-3 ">
      <Table border="1px solid #F0F0F0">
        <Thead bg="#F2F5F7">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr
              key={headerGroup.id}
              border="1px solid #F0F0F0"
              textAlign="left"
            >
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    fontSize="text-xs md:text-sm"
                    bgSize="auto"
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
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} maxHeight="6">
              {row.getVisibleCells().map((cell, index) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                
                const meta = cell.column.id;
                if (state) {
                  return (
                    <Td
                      key={index}
                      paddingBottom="2"
                      paddingTop="2"
                      fontSize="text-base"
                      border="1px solid #F0F0F0 "
                      fontStyle="mormal"
                    >
                      
                      {
                      editRec == +row.id ? (
                        meta == "merchant" ||
                        meta == "type" ||
                        meta == "method" ? (
                          <select className="w-32 h-8 border border-[#D7D7D7] rounded-md ">
                            <option value="volvo">
                              {
                              meta}
                            </option>
                          </select>
                        ) : 
                        // @ts-ignore
                        meta == "pixelCode" ? (
                          <input className="w-32 h-8 border border-[#D7D7D7] rounded-md" />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </Td>
                  );
                } else {
                  return (
                    <Td
                      key={index}
                      // @ts-ignore
                      isNumeric={!!meta?.isNumeric}
                      paddingBottom="2"
                      paddingTop="2"
                      fontSize="text-base"
                      border="1px solid #F0F0F0 "
                      fontStyle="normal"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                }
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
