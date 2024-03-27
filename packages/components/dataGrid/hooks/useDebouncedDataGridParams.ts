import { useEffect, useState } from 'react';
import { MRT_PaginationState, MRT_SortingState, MRT_ColumnFiltersState } from 'material-react-table';

import { DataGridRequestParams } from '../types';

import { mapStateToRequestParams } from './utils';

const debounceValue = 100;

export const useDebouncedDataGridRequestParams = (
  pagination: MRT_PaginationState,
  sort: MRT_SortingState,
  filters: MRT_ColumnFiltersState,
  globalFilter: string,
) => {
  const [params, setParams] = useState<DataGridRequestParams>(
    mapStateToRequestParams(pagination, sort, filters, globalFilter),
  );

  useEffect(() => {
    setParams(mapStateToRequestParams(pagination, sort, filters, globalFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sort]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams(mapStateToRequestParams(pagination, sort, filters, globalFilter));
    }, debounceValue);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, globalFilter]);

  return params;
};
