import { CartItem } from "@/types/cart";
import { X } from "lucide-react";
import Image from "next/image";

type CartItemProps = {
  item: CartItem;
  handeleDelete: () => void;
};

export const CartItemCard = ({ item, handeleDelete }: CartItemProps) => (
  <div className="relative flex gap-3 p-4 border-b">
    <Image
      className="w-[150px] h-[70px] rounded-lg"
      src={item.image}
      alt={item.title}
      width={150}
      height={100}
    />
    <div>
      <h2 className="font-semibold text-sm">{item.title}</h2>
      <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
      <span className="font-semibold">${item.price.toFixed(2)}</span>
    </div>
    <button onClick={handeleDelete} className="absolute top-2 right-0">
      <X size={15} />
    </button>
  </div>
);
