"use client"
import React, { useState, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';

import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

import PaginationControls from './pagination'; // adjust path

const DataTable = ({ data, columns, externalFilter, pageSize: initialPageSize }) => {
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: initialPageSize || 10,
    });

    // Reset pageIndex to 0 when pageSize changes
    useEffect(() => {
        setPagination((old) => ({
            pageIndex: 0,
            pageSize: initialPageSize || 10,
        }));
    }, [initialPageSize]);

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter: externalFilter,
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableRowSelection: true,
    });

    return (
        <div className="p-4 space-y-4">
            {/* Table */}
            <table className="w-full border text-left">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isSortable = header.column.getCanSort();
                                const sortDirection = header.column.getIsSorted();

                                return (
                                    <th
                                        key={header.id}
                                        className="p-2 border-b cursor-pointer select-none"
                                        onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                                    >
                                        <div className="flex items-center gap-1">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}

                                            {isSortable && (
                                                <>
                                                    {sortDirection === 'asc' && <ChevronUp size={16} />}
                                                    {sortDirection === 'desc' && <ChevronDown size={16} />}
                                                    {!sortDirection && <ChevronsUpDown size={16} className="opacity-40" />}
                                                </>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-2 border-b">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <PaginationControls table={table} />
        </div>
    );
};

export default DataTable;
