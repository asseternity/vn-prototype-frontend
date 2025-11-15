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
    <div className="absolute bottom-0 w-full bg-black/60 text-white p-3 h-50 flex flex-row justify-between items-start">
      <div>
        <h1 className="text-3xl">{name}</h1>
        <p>{text}</p>
      </div>
      <div className="h-full w-full flex justify-end items-end">
        <Button onClick={onContinue} className="bg-blue-300 text-black">
          Continue
        </Button>
      </div>
    </div>
  );
}
