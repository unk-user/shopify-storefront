import { HeroSlider } from '@/components/layout/landing-page/hero-slider';
import Image from 'next/image';
const slides = [
  {
    img: '/carousel-1.webp',
    header: 'Keychron K3 Max',
    subHeader: '2.4GHz & Bluetooth | 75% Compact | QMK',
    actionLabel: 'Buy Now',
    actionUrl: 'ui',
  },
  {
    img: '/carousel-2.jpg',
    header: 'Some other Krazy Header',
    subHeader: '2.4GHz & Crazier | SubHeader | QMK',
    actionLabel: 'Buy Now',
    actionUrl: 'ui',
  },
  {
    img: '/carousel-3.jpg',
    header: 'Another Krazy Header',
    subHeader: '2.4GHz & Another | 75% One | QMK',
    actionLabel: 'Shop Now',
    actionUrl: 'ui',
  },
  {
    img: '/carousel-4.jpg',
    header: 'Another Krazy Header',
    subHeader: '2.4GHz & Another | 75% One | QMK',
    actionLabel: 'Buy Now',
    actionUrl: 'ui',
  },
];

const collections = [
  {
    img: '/carousel-1.webp',
    title: 'Keychron K Max',
    description:
      'The K Pro Series are wireless keyboards with a much higher build quality thanks to their aluminum frames and PBT keycaps. They also have sound-dampening foam inside the case to reduce typing noise.',
  },
  {
    img: '/carousel-2.jpg',
    title: 'Keychron Q Max',
    description:
      'The Keychron Q Max keyboards are&nbsp;great for gaming in any genre and at any competitive level. They have amazing build quality and offer excellent all-around performance over a 2.4GHz connection',
  },
  {
    img: '/carousel-3.jpg',
    title: 'Keychron V Max',
    description:
      'the V Max boards have a more premium gasket-mounted design, layers of acoustic foam inside the case, and wireless connectivity with a 2.4 GHz wireless receiver or Bluetooth.',
  },
];

export default async function Home() {
  return (
    <>
      <section className="w-full h-[1000px]">
        Bla Bla Bla
      </section>
    </>
  );
}
