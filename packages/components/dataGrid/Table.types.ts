import { SxProps, Theme } from '@mui/material';
import { Table } from '@tanstack/react-table';

export type TableProps<T extends Record<string, unknown>> = {
  table: Table<T>;
  onRowClick?: (original: T) => void;
  isPaginationShown?: boolean;
  className?: string;
  isLoading?: boolean;
  dataTestIdPrefix?: string;
};
export type Styles = SxProps<Theme>;
