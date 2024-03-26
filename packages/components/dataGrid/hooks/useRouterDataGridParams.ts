import { useMemo } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';
import { OnChangeFn } from '@tanstack/react-table';

import { DataGridState, UIParams } from './types';
import { useDebouncedDataGridRequestParams } from './useDebouncedDataGridParams';
import { initialPaginationState } from './utils';

const getParamUpdater = <ValueType>(
  param: keyof UIParams,
  currentValue: ValueType,
  paramsValue: URLSearchParams,
  setSearchParams: SetURLSearchParams,
): OnChangeFn<ValueType> => {
  return (updaterOrValue) => {
    const newValue = updaterOrValue instanceof Function ? updaterOrValue(currentValue) : updaterOrValue;

    const params = new URLSearchParams(paramsValue);
    params.set(param, JSON.stringify(newValue));
    setSearchParams(params);
  };
};

export const useRouterDataGridParams = <DataType extends Record<string, unknown>>(): DataGridState<DataType> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo<DataGridState['state']>(() => {
    const defaultState: DataGridState['state'] = {
      pagination: initialPaginationState,
      columnFilters: [],
      globalFilter: '',
      sorting: [],
    };

    Object.keys(defaultState).forEach((key) => {
      defaultState[key as keyof DataGridState['state']] =
        JSON.parse(searchParams.get(key) ?? 'null') ?? defaultState[key as keyof DataGridState['state']];
    });

    return defaultState;
  }, [searchParams]);

  const dataGridRequestParams = useDebouncedDataGridRequestParams(
    state.pagination,
    state.sorting,
    state.columnFilters,
    state.globalFilter,
  );

  const onChange = Object.keys(state).reduce(
    (onChangeAcc, key) => {
      const castedKey = key as keyof UIParams;

      return {
        ...onChangeAcc,
        [`on${castedKey[0].toUpperCase()}${castedKey.slice(1)}Change`]: getParamUpdater(
          castedKey,
          state[castedKey],
          searchParams,
          setSearchParams,
        ),
      };
    },
    {} as DataGridState['onChange'],
  );

  return {
    state,
    onChange,
    dataGridRequestParams,
  };
};
