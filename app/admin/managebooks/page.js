"use client"

import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import DataTable from '@/table/mytable';

const columnHelper = createColumnHelper();

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: info => info.getValue(),
  }),
];

const data = [
  { name: 'Alice', email: 'alice@example.com', age: 24 },
  { name: 'Bob', email: 'bob@example.com', age: 30 },
  { name: 'Charlie', email: 'charlie@example.com', age: 22 },
  { name: 'David', email: 'david@example.com', age: 28 },
  { name: 'Eve', email: 'eve@example.com', age: 26 },
  { name: 'Eve', email: 'eve@example.com', age: 26 },
  { name: 'Frank', email: 'frank@example.com', age: 35 },
];

export default function Home() {
  return (
    <>
      <h1 className='font-semibold text-xl mx-3 my-3'>Manage Books</h1>
      <DataTable data={data} columns={columns} externalFilter="" pageSize={2} />
    </>
  );
}
