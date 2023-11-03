import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { flexRender } from '@tanstack/react-table';
import { TableRow, TableHead as MuiTableHead, TableCell } from '@mui/material';

import { TableHeadProps } from './TableHead.types';
export const TableHead = <T extends Record<string, unknown>>({ table, dataTestIdPrefix }: TableHeadProps<T>) => {
  const sortingIcon = {
    asc: <ArrowUpward />,
    desc: <ArrowDownward />,
  };
  return (
    <MuiTableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} data-testid={`${dataTestIdPrefix}-head-row`}>
          {headerGroup.headers.map((header) => (
            <TableCell
              component="th"
              key={header.id}
              scope="col"
              onClick={header.column.getToggleSortingHandler()}
              data-testid={`${dataTestIdPrefix}-head-${header.id}`}
            >
              <span>
                {header.isPlaceholder !== null && flexRender(header.column.columnDef.header, header.getContext())}
                {sortingIcon[header.column.getIsSorted() as keyof typeof sortingIcon] ?? null}
              </span>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableHead>
  );
};
