import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonColor = 'primary' | 'secondary' | 'error';
export type ButtonLoadingPosition = 'start' | 'end' | 'center';

export type ButtonProps<C extends React.ElementType = 'button'> = Omit<
  MuiButtonProps<C, { component?: C }>,
  'variant' | 'color'
> & {
  color?: ButtonColor;
  iconOnly?: boolean;
  loading?: boolean;
  loadingPosition?: ButtonLoadingPosition;
  disabledOpaque?: boolean;
};
