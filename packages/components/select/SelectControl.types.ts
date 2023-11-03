import { SelectProps as MuiSelectProps, SelectChangeEvent as MuiSelectChangeEvent } from '@mui/material';
import { ReactNode } from 'react';

type SelectValue = string | number | null;

export type SelectChangeEvent = MuiSelectChangeEvent<SelectValue>;

export interface SelectControlProps extends Pick<MuiSelectProps, 'label'> {
  options: [string, string][];
  value: SelectValue;
  onChange: (event: SelectChangeEvent, child: ReactNode) => void;
}
