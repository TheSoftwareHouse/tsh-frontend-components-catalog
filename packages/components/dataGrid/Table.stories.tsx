import { Meta, StoryFn } from '@storybook/react';
import { getCoreRowModel, useReactTable, getPaginationRowModel, createColumnHelper } from '@tanstack/react-table';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useQuery } from '@tanstack/react-query';

import { Table } from './Table';
import { ExampleType, exampleData, getDataMockHandler, getDataMock } from './Table.mock';
import { useTableState } from './hooks/useTableState';

// QUERY PROVIDER DECORATOR REQUIRED TO USE THIS COMPONENT (in storybook/preview.js)

export default {
  title: 'DataGrid',
  component: Table,
} as Meta<typeof Table>;

const columnHelper = createColumnHelper<ExampleType>();

const getColumns = () => [
  columnHelper.accessor('date', {
    header: () => 'Date',
    cell: ({ getValue }) => <div>{getValue()}</div>,
    enableSorting: false,
  }),

  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: ({ getValue }) => <div>{getValue()}</div>,
    enableSorting: false,
  }),

  columnHelper.accessor('email', {
    header: () => 'Email',
    cell: ({ getValue }) => <div>{getValue() || '-'}</div>,
    enableSorting: false,
  }),

  columnHelper.accessor('amount', {
    header: () => 'Amount',
    cell: ({ getValue }) => <div>{getValue()}</div>,
    enableSorting: false,
  }),

  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: ({ row }) => {
      return <div>{row.original.status}</div>;
    },
    enableSorting: false,
  }),
];

const BasicTemplate: StoryFn<typeof Table> = (args) => {
  const pagination = args.isPaginationShown ? getPaginationRowModel() : undefined;

  const table = useReactTable({
    getPaginationRowModel: pagination,
    getCoreRowModel: getCoreRowModel(),
    columns: getColumns(),
    data: exampleData,
  });

  return <Table {...args} table={table} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  isLoading: false,
};

export const LoadingState = BasicTemplate.bind({});
LoadingState.args = {
  isLoading: true,
};

export const WithPagination = BasicTemplate.bind({});
WithPagination.args = {
  isPaginationShown: true,
};

const AsyncContent: StoryFn<typeof Table> = (args) => {
  const { pagination, setPagination, pageSize } = useTableState();

  const { data, isLoading } = useQuery(['data', pagination], () =>
    getDataMock({ page: pagination.pageIndex, size: pageSize }),
  );
  const inputData = data?.page ?? [];
  const table = useReactTable({
    pageCount: data?.meta.totalPages,
    manualPagination: true,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    columns: getColumns(),
    data: inputData,
  });

  return <Table {...args} table={table} isPaginationShown isLoading={isLoading} />;
};

const AsyncTemplate: StoryFn<typeof Table> = (args) => {
  return (
    <>
      <AsyncContent {...args} />
      <ReactQueryDevtools />
    </>
  );
};

export const Async = AsyncTemplate.bind({});
Async.args = {};
Async.parameters = {
  msw: {
    handlers: [getDataMockHandler],
  },
};
