import { Meta, Story } from '@storybook/react';

import { PropTypes, ReactResponsiveCarousel } from './ReactResponsiveCarousel';

export default {
  title: 'Carousel (react-responsive-carousel)',
  component: ReactResponsiveCarousel,
} as Meta;

const Template: Story<PropTypes> = (args) => <ReactResponsiveCarousel {...args} />;

export const DefaultCarousel = Template.bind({});
DefaultCarousel.args = {
  items: [
    {
      id: 1,
      imageUrl:
        'https://img.freepik.com/free-photo/beautiful-retro-nature-with-flowers_23-2149681494.jpg?w=1380&t=st=1695892114~exp=1695892714~hmac=6ecf9cc4bd19c8708f835da5982f1f151f77d871c6f6d60b4d3e8b95d252ea0d',
      caption: 'Sample description 1',
    },
    {
      id: 2,
      imageUrl:
        'https://img.freepik.com/darmowe-zdjecie/spokojne-slodkie-konie-w-naturze_23-2149066264.jpg?w=1380&t=st=1695892315~exp=1695892915~hmac=2e241c27d76609ebf3d21f0d9abb119b5a5f7448169d31faa1260deacc8bd42c',
      caption: 'Sample description 2',
    },
    {
      id: 3,
      imageUrl:
        'https://img.freepik.com/darmowe-zdjecie/pasterz-z-dlugiego-strzalu-chodzacy-po-polu_23-2149744253.jpg?w=1380&t=st=1695892391~exp=1695892991~hmac=557d11ca7868297e6f2293f5500281bdc1627f852cce9d8aa9906c3923795a9e',
      caption: 'Sample description 3',
    },
  ],
  config: {
    // pass some additional configuration here :)
    showArrows: false,
  },
};
