import { Carousel, CarouselProps } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export interface CarouselItem {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface PropTypes {
  items: CarouselItem[];
  config?: Partial<CarouselProps>;
}

export const ReactResponsiveCarousel = ({ items, config }: PropTypes) => {
  return (
    <Carousel {...config}>
      {items.map((item) => (
        <div key={item.id}>
          <img src={item.imageUrl} alt={item.caption} />
          <p className="legend">{item.caption}</p>
        </div>
      ))}
    </Carousel>
  );
};
