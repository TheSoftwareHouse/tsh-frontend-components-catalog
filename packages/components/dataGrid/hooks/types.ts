import { MRT_ColumnFiltersState, MRT_SortingState, MRT_PaginationState } from 'material-react-table';
import { OnChangeFn } from '@tanstack/react-table';

import { DataGridRequestParams } from '../types';

export type UIParams = {
  sorting: MRT_SortingState;
  pagination: MRT_PaginationState;
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
};

type MergedValuesAndSetters = {
  state: {
    [Param in keyof UIParams]: UIParams[Param];
  };
  onChange: {
    [Param in keyof UIParams as `on${Capitalize<Param>}Change`]: OnChangeFn<UIParams[Param]>;
  };
};

export type DataGridState<DataType extends Record<string, unknown> = {}> = MergedValuesAndSetters & {
  dataGridRequestParams: DataGridRequestParams<DataType>;
};
