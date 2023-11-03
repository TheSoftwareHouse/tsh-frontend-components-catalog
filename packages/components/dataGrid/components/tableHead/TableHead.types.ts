import { Table } from '@tanstack/react-table';

export type TableHeadProps<T extends Record<string, unknown>> = {
  table: Table<T>;
  dataTestIdPrefix?: string;
};
