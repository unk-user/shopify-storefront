import { ActionButton } from '@/components/action-button';
import { Button } from '@/components/ui/button';

export default function UiPage() {
  return (
    <div className="flex flex-col gap-y-2 mx-auto max-w-[400px] py-12">
      <ActionButton>Explore Now</ActionButton>
      <Button variant="secondary">Button</Button>
    </div>
  );
}
