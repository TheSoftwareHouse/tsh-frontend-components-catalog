import { SlickCarousel } from './SlickCarousel';

export default {
  title: 'Carousel (react-slick)',
  component: SlickCarousel,
};

const items = [
  {
    key: 1,
    item: (
      <div>
        <img src="http://placekitten.com/g/400/200" />
      </div>
    ),
  },

  {
    key: 2,
    item: (
      <div>
        <img src="http://placekitten.com/g/400/200" />
      </div>
    ),
  },
  {
    key: 3,
    item: (
      <div>
        <img src="http://placekitten.com/g/400/200" />
      </div>
    ),
  },
];
const styles = {
  width: '400px',
};

export const CustomConfig = () => (
  <SlickCarousel
    styles={styles}
    items={items}
    config={{
      dots: true,
      autoplay: true,
      arrows: false,
    }}
  />
);
