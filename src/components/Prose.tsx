import { cn } from '@/lib/utils';
import type { FunctionComponent } from 'react';

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  return (
    <div
      className={cn(
        'prose max-w-none w-full prose-headings:text-primary-foreground prose-img:w-full prose-img:!mx-0 prose-headings:!mb-2 prose-headings:lg:!text-center *:max-lg:!text-start prose-p:!m-0 prose-p:lg:!text-center prose-img:mt-24 *:!text-lg prose-h1:!text-3xl',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
