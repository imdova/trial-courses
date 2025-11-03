import Image from "next/image";
import { Button } from "./button";

interface EmptyCardProps {
  src: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}
const EmptyCard: React.FC<EmptyCardProps> = ({
  src,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      {/* Image */}
      <Image src={src} alt={buttonText} width={180} height={180} />
      {/* Description */}
      <p className="text-muted-foreground text-sm">{description}</p>
      {/* Button */}
      <Button onClick={onClick}>{buttonText}</Button>
    </div>
  );
};

export default EmptyCard;
