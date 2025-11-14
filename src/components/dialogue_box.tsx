import { Button } from '@/components/ui/button';

type DialogueBoxProps = {
  name: string;
  text: string;
  onContinue: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function DialogueBox({
  name = '',
  text = '...',
  onContinue,
}: DialogueBoxProps) {
  return (
    <div className="absolute bottom-0 w-full bg-black/60 text-white p-4 flex flex-row justify-between items-end">
      <div>
        <h1 className="text-3xl">{name}</h1>
        <p>{text}</p>
      </div>
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
}
