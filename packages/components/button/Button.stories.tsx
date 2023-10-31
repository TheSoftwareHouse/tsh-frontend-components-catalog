import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { ButtonProps as MuiButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';

import { Button } from './Button';
import { ButtonProps } from './Button.types';

const Prop = ({ children }: PropsWithChildren) => (
  <Box component="span" sx={{ backgroundColor: 'primary.light', p: 0.5, borderRadius: 1 }}>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'select' },
    },
    color: { options: ['primary', 'secondary', 'error'], control: { type: 'select' } },
  },
} as ComponentMeta<typeof Button>;

const ButtonTemplate = <C extends React.ElementType>(args: ButtonProps<C>) => <Button {...args}>{args.size}</Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  const sizes: MuiButtonProps['size'][] = ['small', 'medium', 'large'];

  return (
    <Box>
      <Stack spacing={4} sx={{ background: '#F5F6F7', p: 4, borderRadius: 2 }}>
        {sizes.map((size, idx) => (
          <Stack key={idx} spacing={3} direction="row">
            <ButtonTemplate {...args} size={size} />
            <ButtonTemplate {...args} size={size} startIcon={'Start'} />
            <ButtonTemplate {...args} size={size} endIcon={'End'} />
            <Button {...args} size={size}>
              Hello
            </Button>
            <Button {...args} size={size} iconOnly>
              World
            </Button>
            <ButtonTemplate {...args} size={size} disabled />
            <Button {...args} size={size} iconOnly disabled>
              Hello World
            </Button>
          </Stack>
        ))}
      </Stack>
      <Stack sx={{ mt: 2 }}>
        <Typography variant="caption">
          Pass <Prop>icon</Prop> prop to render square <Prop>IconButton</Prop> instead of regular button component.
        </Typography>
        <Typography variant="caption" sx={{ mt: 1 }}>
          For all additional props please refer to{' '}
          <Link href={'https://mui.com/material-ui/react-button/'} target="_blank">
            Button Mui API
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

const LoadingButtonTemplate: ComponentStory<typeof Button> = (args) => (
  <Box>
    <ButtonTemplate {...args} />
    <Stack sx={{ mt: 2 }}>
      <Typography variant="caption">
        Pass <Prop>loading</Prop> prop to render progress animation. You can specify loading appearance using{' '}
        <Prop>loadingPosition</Prop> prop.
      </Typography>
      <Typography variant="caption">
        For all additional props please refer to{' '}
        <Link href={'https://mui.com/material-ui/react-button/'} target="_blank">
          Button Mui API
        </Link>
      </Typography>
    </Stack>
  </Box>
);

export const ContainedPrimary = Template.bind({});
ContainedPrimary.args = {
  variant: 'contained',
  color: 'primary',
};

export const ContainedError = Template.bind({});
ContainedError.args = {
  variant: 'contained',
  color: 'error',
};

export const OutlinedPrimary = Template.bind({});
OutlinedPrimary.args = {
  variant: 'outlined',
  color: 'primary',
};

export const OutlinedError = Template.bind({});
OutlinedError.args = {
  variant: 'outlined',
  color: 'error',
};

export const TextPrimary = Template.bind({});
TextPrimary.args = {
  variant: 'text',
  color: 'primary',
};

export const TextSecondary = Template.bind({});
TextSecondary.args = {
  variant: 'text',
  color: 'secondary',
};

export const TextError = Template.bind({});
TextError.args = {
  variant: 'text',
  color: 'error',
};

export const LoadingButton = LoadingButtonTemplate.bind({});
LoadingButton.args = {
  loading: true,
  loadingPosition: 'start',
  size: 'large',
  variant: 'outlined',
  color: 'primary',
};
