import { HeroSlider } from '@/components/hero-slider';

const slides = [
  {
    img: '/carousel-1.webp',
    header: 'Keychron K3 Max',
    subHeader: '2.4GHz & Bluetooth | 75% Compact | QMK',
    actionLabel: 'Buy Now',
    actionUrl: '#',
  },
  {
    img: '/carousel-2.jpg',
    header: 'Some other Krazy Header',
    subHeader: '2.4GHz & Crazier | SubHeader | QMK',
    actionLabel: 'Buy Now',
    actionUrl: '#',
  },
  {
    img: '/carousel-3.jpg',
    header: 'Another Krazy Header',
    subHeader: '2.4GHz & Another | 75% One | QMK',
    actionLabel: 'Shop Now',
    actionUrl: '#',
  },
  {
    img: '/carousel-4.jpg',
    header: 'Another Krazy Header',
    subHeader: '2.4GHz & Another | 75% One | QMK',
    actionLabel: 'Buy Now',
    actionUrl: '#',
  },
];

export default function Home() {
  return (
    <div className="w-full h-full">
      <HeroSlider slides={slides} />
    </div>
  );
}
