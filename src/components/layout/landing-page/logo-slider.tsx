import { Marquee } from '@/components/marquee';

import Image from 'next/image';
import cnn from '@/../public/marquee/CNN.svg';
import digitaltrends from '@/../public/marquee/digital-trends.svg';
import forbes from '@/../public/marquee/forbes.png';
import ltt from '@/../public/marquee/ltt.svg';
import mkbhd from '@/../public/marquee/MKBHD.svg';
import techcrunch from '@/../public/marquee/TechCrunch_logo.svg';
import wirecutter from '@/../public/marquee/wirecutter.png';
import wired from '@/../public/marquee/wired.svg';

export function LogoSlider() {
  return (
    <section className="section-default w-full overflow-x-hidden">
      <div className="w-full py-3 bg-secondary">
        <Marquee>
          <Image height={44} src={cnn} alt="cnn" />
          <Image height={44} src={digitaltrends} alt="digitaltrends" />
          <Image height={44} src={forbes} alt="forbes" />
          <Image height={44} src={ltt} alt="ltt" />
          <Image height={44} src={mkbhd} alt="mkbhd" />
          <Image height={44} src={techcrunch} alt="techcrunch" />
          <Image height={44} src={wirecutter} alt="wirecutter" />
          <Image height={44} src={wired} alt="wired" />
        </Marquee>
      </div>
    </section>
  );
}
