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

const keyfeatures = [
  {
    header: 'Wireless & Wired',
    description:
      'Connect the keyboard with up to 3 devices via Bluetooth or to a single device with the USB Type-C wired option. Pair it up with your smartphone, laptop and iPad, and switch amongst the devices swiftly, that is best for home, office and light gaming uses.',
    img: '/carousel-1.webp',
  },
  {
    header: "Keychron's Mac Layout",
    description:
      'Keychron is one of the few mechanical keyboards that features macOS media keys (F1 to F12) in a Mac layout with the same as conventional Mac systems.',
    img: '/carousel-2.jpg',
  },
  {
    header: 'Compatible With All Devices',
    description:
      'Keychron keyboards are 100% compatible with multiple operating systems. Perfectly suitable for macOS, Windows, iOS, as well as Android.',
    img: '/carousel-3.jpg',
  },
];

export default async function Home() {
  return (
    <>
      <HeroSlider slides={slides} />
      <section className="w-full px-16 py-12 space-y-4">
        <h2 className="text-2xl font-bold">Collections</h2>
        <div className="grid grid-cols-3 gap-x-3">
          {collections.map((collection) => (
            <div
              key={collection.title}
              className="w-full aspect-[8/9] relative overflow-hidden rounded-md"
            >
              <Image
                src={collection.img}
                alt={collection.title}
                sizes="(100vw, 100vh)"
                className="object-cover -z-10"
                fill
              />
              <div className="text-white w-full h-full flex flex-col justify-end z-20 p-8 bg-black/40">
                <h3 className="text-lg font-semibold">{collection.title}</h3>
                <p className="text-base">{collection.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
