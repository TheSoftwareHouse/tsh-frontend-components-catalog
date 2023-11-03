import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

import { SelectChangeEvent } from '../SelectControl.types';

export const useParamMutator = (key: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return useCallback(
    (event: SelectChangeEvent) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, String(event.target.value));
      setSearchParams(params);
    },
    [key, searchParams, setSearchParams],
  );
};
