import { Meta, StoryFn } from '@storybook/react';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useQuery } from '@tanstack/react-query';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

import { ExampleType, getDataMock } from './Table.mock';
import { useStateDataGridParams } from './hooks/useStateDataGridParams';
import { DataGridRequestParams, DataGridResponse } from './types';
import { useRouterDataGridParams } from './hooks/useRouterDataGridParams';

// QUERY PROVIDER DECORATOR REQUIRED TO USE THIS COMPONENT (in storybook/preview.js)

export default {
  title: 'DataGrid',
  component: MaterialReactTable,
} as Meta<typeof MaterialReactTable>;

const columns: MRT_ColumnDef<ExampleType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: false,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

const useExampleDataSource = (requestParams: DataGridRequestParams) => {
  return useQuery<DataGridResponse<ExampleType>>(['data', requestParams], () => getDataMock(requestParams), {
    keepPreviousData: true,
  });
};

const BasicTemplate: StoryFn = () => {
  const { dataGridRequestParams, onChange, state } = useStateDataGridParams<ExampleType>();

  const { data, isLoading, isRefetching } = useExampleDataSource(dataGridRequestParams);

  const table = useMaterialReactTable({
    columns,
    data: data?.data ?? [],
    initialState: { showColumnFilters: true },
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    enableMultiSort: true,
    isMultiSortEvent: () => true,
    ...onChange,
    rowCount: data?.meta.pagination.total,
    state: {
      ...state,
      isLoading,
      showProgressBars: isRefetching,
    },
  });

  return <MaterialReactTable table={table} />;
};

export const Basic = BasicTemplate.bind({});

const RouterTemplate: StoryFn = () => {
  const [searchParams] = useSearchParams();

  const { dataGridRequestParams, onChange, state } = useRouterDataGridParams<ExampleType>();

  const { data, isLoading, isRefetching } = useExampleDataSource(dataGridRequestParams);

  const table = useMaterialReactTable({
    columns,
    data: data?.data ?? [],
    initialState: { showColumnFilters: true },
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    enableMultiSort: true,
    isMultiSortEvent: () => true,
    ...onChange,
    rowCount: data?.meta.pagination.total,
    state: {
      ...state,
      isLoading,
      showProgressBars: isRefetching,
    },
  });

  return (
    <>
      <div>
        {Array.from(searchParams.entries()).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
      <MaterialReactTable table={table} />
    </>
  );
};

const RouterTemplateWithRouter = () => (
  <BrowserRouter>
    <RouterTemplate />
  </BrowserRouter>
);

export const RouterState = RouterTemplateWithRouter.bind({});
