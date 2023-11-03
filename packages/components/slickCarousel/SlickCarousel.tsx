import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CSSProperties, ReactNode } from 'react';

interface SlickCarouselProps {
  items: { key: number | string; item: ReactNode }[];
  config: Settings;
  styles: CSSProperties;
}

export const SlickCarousel = ({ items, config, styles }: SlickCarouselProps) => {
  return (
    <div style={styles}>
      <Slider {...config}>
        {items.map((slide) => {
          return <div key={slide.key}>{slide.item}</div>;
        })}
      </Slider>
    </div>
  );
};
