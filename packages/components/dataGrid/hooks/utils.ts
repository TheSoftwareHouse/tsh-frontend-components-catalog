import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table';

import { DataGridRequestParams, FiltersState, SortState } from '../types';

export const initialPaginationState: MRT_PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};

export const mapStateToRequestParams = <DataType extends Record<string, unknown> = {}>(
  pagination: MRT_PaginationState = initialPaginationState,
  sort?: MRT_SortingState,
  filters?: MRT_ColumnFiltersState,
  globalFilter?: string,
): DataGridRequestParams<DataType> => ({
  limit: pagination.pageSize,
  page: pagination.pageIndex + 1,
  filter: filters?.reduce<FiltersState<DataType>>((filterObj, { id, value }) => ({ ...filterObj, [id]: value }), {}),
  search: globalFilter,
  sort: sort?.reduce<SortState<DataType>>(
    (filterObj, { id, desc }) => ({ ...filterObj, [id]: desc ? 'DESC' : 'ASC' }),
    {},
  ),
});
