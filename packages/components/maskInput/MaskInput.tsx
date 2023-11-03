import { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';

import { formatValue } from './formatter';

export type MaskType = 'phone' | 'date' | 'creditCard';

interface MaskInputProps {
  maskType: MaskType;
}

const PLACEHOLDERS: Record<MaskType, string> = {
  phone: '(123) 456-7890',
  date: 'DD/MM/RRRR',
  creditCard: 'XXXX XXXX XXXX XXXX',
};

const MaskInput = ({ maskType, ...props }: MaskInputProps) => {
  const [value, setValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatValue(inputValue, maskType);
    setValue(formattedValue);
  };

  return <TextField {...props} value={value} onChange={handleInputChange} placeholder={PLACEHOLDERS[maskType]} />;
};

export default MaskInput;
