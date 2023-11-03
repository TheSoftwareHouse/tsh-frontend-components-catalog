import { Table } from '@tanstack/react-table';

export type TableBodyProps<T extends Record<string, unknown>> = {
  table: Table<T>;
  onRowClick?: (original: T) => void;
  dataTestIdPrefix?: string;
};
