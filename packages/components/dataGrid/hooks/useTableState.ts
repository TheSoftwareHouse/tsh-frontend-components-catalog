import { useState } from 'react';
export const useTableState = () => {
  const pageSize = 10;
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: pageSize });
  return { pagination, setPagination, pageSize };
};
