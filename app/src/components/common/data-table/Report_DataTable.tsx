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
  footerData?: any;
  reportFields: reportFields[];
};

interface reportFields {
  id: number;
  title: string;
  isChecked: boolean;
  value: string;
}

export function ReportDataTable<Data extends object>({
  data,
  columns,
  footerData = [],
  reportFields,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isHidden, setIsHidden] = React.useState<number[]>([]);
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
    <div className=" scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 scrollbar-thumb-rounded-full  scrollbar-track-rounded-full mt-4 overflow-x-scroll lg:overflow-y-hidden xl:overflow-x-hidden ">
      <Table border="1px solid #F0F0F0">
        <Thead bg="#F2F5F7">
          {getHeaderGroups().map((headerGroup, index) => (
            <Tr
              key={headerGroup.id}
              border="1px solid #F0F0F0"
              textAlign="left"
            >
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta = header.column.columnDef.meta;
                let isShow = true;
                reportFields.map((report) => {
                  if (header.id == report.value) {
                    if (!report.isChecked) {
                      isShow = false;
                    }
                  }
                });

                if (isShow) {
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      // @ts-ignore
                      isNumeric={!!meta?.isNumeric}
                      className="font-base font-bold"
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
                }
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {getRowModel().rows.map((row, index) => (
            <Tr key={row.id} className={index % 2 == 0 ? "" : " bg-[#F9FAFF]"}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta = cell.column.columnDef.meta;
                let isShow = true;
                reportFields.map((report) => {
                  if (
                    cell.id ==
                    index.toString() + "_" + report.value.toString()
                  ) {
                    if (!report.isChecked) {
                      isShow = false;
                    }
                  }
                });

                if (isShow) {
                  return (
                    <Td
                      key={cell.id}
                      // @ts-ignore
                      isNumeric={!!meta?.isNumeric}
                      className="text-sm"
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
