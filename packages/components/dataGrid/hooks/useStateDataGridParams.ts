import { MRT_ColumnFiltersState, MRT_SortingState, MRT_PaginationState } from 'material-react-table';
import { useState } from 'react';

import { DataGridState } from './types';
import { useDebouncedDataGridRequestParams } from './useDebouncedDataGridParams';
import { initialPaginationState } from './utils';

export const useStateDataGridParams = <DataType extends Record<string, unknown>>(): DataGridState<DataType> => {
  const [columnFilters, onColumnFiltersChange] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, onGlobalFilterChange] = useState('');
  const [sorting, onSortingChange] = useState<MRT_SortingState>([]);
  const [pagination, onPaginationChange] = useState<MRT_PaginationState>(initialPaginationState);

  const dataGridParams = useDebouncedDataGridRequestParams(pagination, sorting, columnFilters, globalFilter);

  return {
    state: {
      pagination,
      columnFilters,
      globalFilter,
      sorting,
    },
    onChange: {
      onColumnFiltersChange,
      onGlobalFilterChange,
      onSortingChange,
      onPaginationChange,
    },
    dataGridRequestParams: dataGridParams,
  };
};
