import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is the Keychron keyboard suitable for long hours of typing?',
    answer:
      'Yes, the Keychron keyboard is designed to handle long hours of typing.',
  },
  {
    question: 'Can I use the Keychron keyboard with my laptop?',
    answer:
      'Yes, the Keychron keyboard is compatible with most laptops and desktops.',
  },
  {
    question: 'Can I use the Keychron keyboard with my iPhone?',
    answer:
      'Yes, the Keychron keyboard is compatible with Apple devices such as iPhone, iPad, and iPod touch.',
  },
];

export function FaqSection() {
  return (
    <section className="section-default">
      <h1 className="text-2xl font-semibold w-full text-center mb-6">FAQ</h1>
      <Accordion className="max-w-3xl mx-auto" type="single" collapsible>
        {faqs.map(({ question, answer }) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger className="font-medium">
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
