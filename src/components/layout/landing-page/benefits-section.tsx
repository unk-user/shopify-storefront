import Image from 'next/image';

const benefits = [
  {
    title: 'Designed for Comfort',
    description:
      'With its ergonomic build and responsive switches, Keychron ensures a comfortable typing experience, reducing fatigue during long work hours.',
  },
  {
    title: 'Built to Last',
    description:
      'Engineered with high-quality materials, Keychron keyboards are durable, designed to withstand everyday use and maintain performance over time.',
  },
  {
    title: 'Space-Saving Design',
    description:
      'The compact layout of Keychron keyboards maximizes desk space without sacrificing functionality, making them perfect for clutter-free workstations.',
  },
  {
    title: 'Effortless Customization',
    description:
      'Easily personalize your typing experience by adjusting key layouts and shortcuts to match your workflow, ensuring maximum efficiency and comfort.',
  },
];

export function BenefitsSection() {
  return (
    <section className="section-dafault mobile-px py-8">
      <h2 className="text-2xl font-semibold text-center">
        Why Choose Keychron
      </h2>
      <div className="w-full mt-8 flex items-center">
        <div className="w-1/2 h-[424px] rounded-xl overflow-hidden relative">
          <Image
            src="/benefits.webp"
            alt="benefits"
            className="object-cover"
            quality={100}
            fill
          />
        </div>
        <div className="w-1/2 pl-14 py-3">
          <ul className="space-y-5">
            {benefits.map((item) => (
              <li key={item.title} className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
