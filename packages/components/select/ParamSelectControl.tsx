import { SelectControl } from './SelectControl';
import { ParamSelectControlProps } from './ParamSelectControl.types';
import { useParamMutator } from './hooks/useParamMutator';

export const ParamSelectControl = ({ param, label, options, value }: ParamSelectControlProps) => {
  const handleChange = useParamMutator(param);

  return <SelectControl label={label} options={options} value={value} onChange={handleChange} />;
};
