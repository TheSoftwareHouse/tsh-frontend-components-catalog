import {
  CircularProgress,
  Table as MuiTable,
  TableBody as MuiTableBody,
  Pagination as MuiPagination,
  Box,
  TableRow,
  TableCell,
} from '@mui/material';

import * as S from './Table.styles';
import { TableProps } from './Table.types';
import { TableBody } from './components/tableBody/TableBody';
import { TableHead } from './components/tableHead/TableHead';
const PAGE_OFFSET = 1;
export const Table = <T extends Record<string, unknown>>({
  onRowClick,
  isPaginationShown = false,
  dataTestIdPrefix,
  className,
  isLoading,
  table,
}: TableProps<T>) => {
  const currentPage = table.getState().pagination.pageIndex + PAGE_OFFSET;
  const handlePaginationClick = (page: number) => {
    const newPageWithOffset = page - PAGE_OFFSET;
    table.setPageIndex(newPageWithOffset);
  };
  return (
    <>
      <MuiTable className={className}>
        <TableHead table={table} dataTestIdPrefix={dataTestIdPrefix} />
        {isLoading ? (
          <MuiTableBody>
            <TableRow>
              <TableCell sx={S.circleProgressWrapper} colSpan={table.getAllColumns().length}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          </MuiTableBody>
        ) : (
          <TableBody table={table} onRowClick={onRowClick} dataTestIdPrefix={dataTestIdPrefix} />
        )}
      </MuiTable>
      {isPaginationShown && (
        <Box sx={S.paginationWrapper}>
          <MuiPagination
            onChange={(_, page) => handlePaginationClick(page)}
            page={currentPage}
            count={table.getPageCount()}
          />
        </Box>
      )}
    </>
  );
};
