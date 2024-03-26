export type SortValue = 'ASC' | 'DESC';

export type FiltersState<DataType extends Record<string, unknown> = {}> = Partial<Record<keyof DataType, string[]>>;
export type SortState<DataType extends Record<string, unknown> = {}> = Partial<Record<keyof DataType, SortValue>>;

export type PaginationState = {
  page: number;
  limit: number;
};

export type DataGridRequestParams<DataType extends Record<string, unknown> = {}> = PaginationState & {
  sort?: SortState<DataType>;
  filter?: FiltersState<DataType>;
  search?: string;
};

export type PaginationMeta = PaginationState & {
  total: number;
  totalPages: number;
};

export type DataGridResponse<DataType extends Record<string, unknown> = {}> = {
  meta: {
    pagination: PaginationMeta;
    filter?: FiltersState<DataType>;
    sort?: SortState<DataType>;
    search?: string;
  };
  data: DataType[];
};
