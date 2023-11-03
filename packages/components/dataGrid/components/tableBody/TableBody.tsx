import { flexRender } from '@tanstack/react-table';
import { TableBody as MuiTableBody, TableRow, TableCell, Typography } from '@mui/material';

import { TableBodyProps } from './TableBody.types';
export const TableBody = <T extends Record<string, unknown>>({
  table,
  onRowClick,
  dataTestIdPrefix,
}: TableBodyProps<T>) => {
  return (
    <MuiTableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-testid={`${dataTestIdPrefix}-row`}
            onClick={() => onRowClick && onRowClick(row.original)}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} data-testid={`${dataTestIdPrefix}-${cell.id}`}>
                <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow data-testid={`${dataTestIdPrefix}-row`}>
          <TableCell colSpan={table.getAllColumns().length}>
            <Typography>No results</Typography>
          </TableCell>
        </TableRow>
      )}
    </MuiTableBody>
  );
};
