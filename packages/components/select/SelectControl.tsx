import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useId } from 'react';
import MenuItem from '@mui/material/MenuItem';

import { SelectControlProps } from './SelectControl.types';

export const SelectControl = ({ options, label, value, onChange }: SelectControlProps) => {
  const id = useId();
  const labelId = useId();

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} id={id} label={label} value={value} onChange={onChange}>
        {options.map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
