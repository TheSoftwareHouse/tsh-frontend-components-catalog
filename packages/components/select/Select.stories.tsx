import { Box, Typography } from '@mui/material';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { Meta, StoryFn } from '@storybook/react';

import { ParamSelectControl } from './ParamSelectControl';

export default {
  title: 'Select',
  component: ParamSelectControl,
} as Meta<typeof ParamSelectControl>;

const label = 'Choose Star Wars character';
const options: [string, string][] = [
  ['Anakin', 'Skywalker'],
  ['Obi-Wan', 'Kenobi'],
  ['Padme', 'Amidala'],
];
const param = 'swChar';

const Template: StoryFn<typeof ParamSelectControl> = (args) => (
  <BrowserRouter>
    <Box sx={{ width: '500px' }}>
      <SelectTemplate {...args} />
    </Box>
  </BrowserRouter>
);

const SelectTemplate: StoryFn<typeof ParamSelectControl> = (args) => {
  const [searchParams] = useSearchParams();
  const urlValue = searchParams.get(args.param);

  return (
    <>
      <ParamSelectControl {...args} />
      <Box>
        <Typography variant="h5">URL value: {urlValue}</Typography>
      </Box>
    </>
  );
};

export const Select = Template.bind({});
Select.args = {
  label,
  options,
  param,
};
