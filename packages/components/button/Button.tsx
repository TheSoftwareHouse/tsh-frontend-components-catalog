import { CircularProgress, Button as MuiButton } from '@mui/material';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { ButtonProps } from './Button.types';

const loadingComponent = <CircularProgress color="inherit" size={24} />;

export const Button = forwardRef(
  <C extends React.ElementType>(
    {
      children,
      variant,
      color = 'primary',
      loading,
      loadingPosition = 'start',
      startIcon,
      endIcon,
      iconOnly,
      disabledOpaque,
      ...props
    }: ButtonProps<C>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <MuiButton
        type="button"
        variant={variant}
        color={color}
        startIcon={loadingPosition === 'start' && loading ? loadingComponent : startIcon}
        endIcon={loadingPosition === 'end' && loading ? loadingComponent : endIcon}
        sx={{ pointerEvents: loading ? 'none' : 'all' }}
        {...props}
        className={clsx({ 'icon-only': iconOnly, 'disabled-opaque': disabledOpaque }, props.className)}
        ref={ref}
      >
        {loadingPosition === 'center' && loading ? loadingComponent : children}
      </MuiButton>
    );
  },
);
