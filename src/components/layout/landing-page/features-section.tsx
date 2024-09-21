import { FolderCode, Monitor } from 'lucide-react';
import { Command, Wifi } from 'react-feather';

const features = [
  {
    title: 'Wireless & Wired',
    description:
      'Connect to 3 Bluetooth devices or 1 USB-C. Switch easily between phone, laptop, and tablet. For every use-case.',
    icon: <Wifi />,
  },
  {
    title: 'Compatible With All Devices',
    description:
      'Supports macOS, Windows, iOS, and Android. Compatible with various devices and platforms.',
    icon: <Monitor />,
  },
  {
    title: "Keychron's Mac Layout",
    description:
      'Keychron offers rare mechanical keyboards with macOS media keys (F1-F12) in a standard Mac layout.',
    icon: <Command />,
  },
  {
    title: 'Customizable Keymap',
    description:
      'Customize keys and create macros easily with QMK/VIA for enhanced productivity.',
    icon: <FolderCode />,
  },
];

export function FeaturesSection() {
  return (
    <section className="section-default mobile-px flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-center">
        Signature Keychron Features
      </h2>
      <ul className="flex justify-between items-start">
        {features.map((feature) => (
          <li
            className="flex flex-col items-start gap-3 max-w-[300px]"
            key={feature.title}
          >
            <div className="w-9 h-9 border rounded-sm bg-secondary flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-lg font-medium">{feature.title}</h3>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
