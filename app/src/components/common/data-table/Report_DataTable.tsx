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
    <div className="scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 scrollbar-thumb-rounded-full  scrollbar-track-rounded-full mt-4 overflow-x-scroll lg:overflow-y-hidden xl:overflow-x-hidden ">
      <table className="w-full border border-[F0F0F0]">
        <thead className="bg-[#F2F5F7]">
          {getHeaderGroups().map((headerGroup, _index) => (
            <tr
              key={headerGroup.id}
              className="border border-[#F0F0F0] text-left"
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
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      // @ts-ignore
                      isNumeric={!!meta?.isNumeric}
                      className="font-base font-bold"
                    >
                      <div className="text=[#323232] flex p-3 text-sm">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <span className="flex items-center pl-2">
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            )
                          ) : null}
                        </span>
                      </div>
                    </th>
                  );
                }
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row, index) => (
            <tr key={row.id} className={index % 2 == 0 ? "" : " bg-[#F9FAFF]"}>
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
                    <td
                      key={cell.id}
                      // @ts-ignore
                      isNumeric={!!meta?.isNumeric}
                      className="p-3 text-sm text-[#404040]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
