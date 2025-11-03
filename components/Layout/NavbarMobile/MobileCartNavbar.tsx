"use client";

import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Exams } from "@/types/exams";
import QuantitySelector from "@/components/UI/QuantitySelector";

type MobileCartNavbarProps = {
  product: Exams;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleAddToCart: () => void;
  loading: boolean;
};

const MobileCartNavbar: React.FC<MobileCartNavbarProps> = ({
  product,
  quantity,
  handleAddToCart,
  loading,
}) => {
  const { products: productData } = useAppSelector((state) => state.cart);
  const isInCart = productData.some((item) => item.id === product?.id);

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 block border-t bg-white shadow-lg md:hidden">
      <div className="flex items-center justify-between p-4">
        <QuantitySelector
          productId={product?.id ?? ""}
          initialQuantity={quantity}
          min={1}
          max={product?.stock || 99}
          buttonSize="md"
          showLabel={false}
          className="flex-1"
        />

        <button
          onClick={handleAddToCart}
          disabled={loading || !product?.stock}
          className={`ml-4 flex flex-1 items-center justify-center gap-2 rounded-sm px-4 py-3 text-xs font-medium text-white transition-colors ${
            loading
              ? "cursor-not-allowed bg-green-400"
              : "bg-primary hover:bg-green-800"
          } ${!product?.stock ? "cursor-not-allowed bg-gray-400" : ""}`}
        >
          {loading ? (
            "Adding..."
          ) : product?.stock ? (
            <>
              <ShoppingCart size={15} />
              {isInCart ? "Update Cart" : "Add to Cart"}
            </>
          ) : (
            "Out of Stock"
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileCartNavbar;
