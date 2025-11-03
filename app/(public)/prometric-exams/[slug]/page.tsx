"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import NotFound from "@/app/not-found";
import Image from "next/image";
import InfoCards from "@/components/UI/InfoCards";
import { motion } from "framer-motion";
import {
  Archive,
  Check,
  ChevronRight,
  Handshake,
  Landmark,
  ListRestart,
  RefreshCcw,
  ShoppingBag,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react";
import { ProgressLine } from "@/components/UI/ProgressLine";
import MobileCartNavbar from "@/components/Layout/NavbarMobile/MobileCartNavbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Drawer } from "@/components/UI/Drawer";
import { ExamsData } from "@/constants/exams.data";
import ProductImagesSlider from "@/components/UI/ProductImagesSlider";
import { addProduct, updateProductQuantity } from "@/store/slices/cartSlice";
import ExamCard from "@/components/UI/ExamCard";
import ProductsSlider from "@/components/UI/ProductsSlider";
import QuantitySelector from "@/components/UI/QuantitySelector";
import ProductReviews from "@/components/UI/ProductReviews";
import { reviews } from "@/constants/reviews";

interface ExamPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = ({ params }: ExamPageProps) => {
  const { slug } = React.use(params);
  const exam = ExamsData.find((exam) => exam.id === slug);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [currentNudgeIndex, setCurrentNudgeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { products: exams, totals } = useAppSelector((state) => state.cart);
  const cartProduct = exams.find((item) => item.id === exam?.id);
  // Check if product is in cart
  const isInCart = exams.some((item) => item.id === exam?.id);

  // Auto-rotate nudges every 3 seconds
  const nudgeCount = exam?.nudges ? exam?.nudges?.length : 0;

  useEffect(() => {
    if (nudgeCount === 0) return;

    const interval = setInterval(() => {
      setCurrentNudgeIndex((prev) => (prev === nudgeCount - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [nudgeCount]);

  useEffect(() => {
    if (cartProduct?.quantity) {
      setQuantity(cartProduct.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartProduct?.quantity]);

  const handleAddToCart = async () => {
    setLoading(true);

    // Simulate delay for loader effect (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!exam?.id) {
      console.log("Product information is missing", "error");
      setLoading(false);
      return;
    }

    if (!isInCart) {
      // Add new item to cart
      dispatch(
        addProduct({
          id: exam.id,
          title: exam.title ?? "",
          image: exam.images?.[0] ?? "/images/placeholder.jpg",
          description: exam.description ?? "No description available",
          price: exam.price ?? 0,
          discountedPrice: exam.discountedPrice,
        }),
      );
      console.log("Added to cart", "success");
    } else {
      // exam is already in cart - handle quantity increase
      const currentCartItem = exams.find((item) => item.id === exam.id);
      const currentQuantity = currentCartItem?.quantity ?? 0;
      const availableStock = exam.stock ?? 0;
      const requestedTotal = currentQuantity + quantity;

      if (requestedTotal > availableStock) {
        const canAdd = availableStock - currentQuantity;
        if (canAdd > 0) {
          dispatch(
            updateProductQuantity({
              id: exam.id,
              quantity: currentQuantity + canAdd, // ✅ خليها quantity مش amount
            }),
          );
          console.log(
            `Only ${canAdd} more available. Added to your existing quantity.`,
            "info",
          );
        } else {
          console.log("No more items available in stock", "error");
        }
      } else {
        dispatch(
          updateProductQuantity({
            id: exam.id,
            quantity: requestedTotal, // ✅ زيادة الكمية مظبوط
          }),
        );
        console.log(`Added ${quantity} more to your cart`, "success");
      }
    }

    setLoading(false);
    setIsOpen(true);
  };

  if (!exam) return <NotFound />;
  return (
    <div className="min-h-screen pt-8">
      <Head>
        <title>{exam.title} | Medicova</title>
        <meta name="description" content={exam.description} />
      </Head>

      <Drawer position="right" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ul className="max-h-[500px] max-w-[270px] overflow-y-auto">
          {exams.map((item) => {
            return (
              <li className="mb-2" key={item.id}>
                <Link href={`/prometric-exams/${item.id}`}>
                  <div className="flex h-[100px] gap-2">
                    <div>
                      <Image
                        className="h-full w-[80px] object-cover"
                        src={item.image || "/placholder.png"}
                        width={300}
                        height={300}
                        alt={item.title}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-sm font-semibold">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-1 text-xs">
                        Added to cart{" "}
                        <span className="bg-primary flex h-3 w-3 items-center justify-center rounded-full text-white">
                          <Check size={10} />
                        </span>
                      </div>
                      {item.quantity && (
                        <div className="text-xs">Qty: {item.quantity}</div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex justify-between gap-2 font-semibold text-gray-700">
          <span className="text-sm">Cart Total</span>
          <p className="text-sm">EGP {totals.productsTotal}</p>
        </div>
        <div>
          <button className="bg-primary mt-6 w-full rounded-lg px-4 py-2 text-xs font-semibold text-white uppercase transition hover:bg-green-700">
            CHECKOUT
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-primary mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase"
          >
            Continue Shopping
          </button>
        </div>
      </Drawer>
      {/* Main Product Section */}
      <main className="container mx-auto bg-white p-3 lg:max-w-[1440px]">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-10 md:gap-6">
          <div className="col-span-1 h-full bg-white md:col-span-5 lg:col-span-3">
            <div className="my-3 block md:hidden">
              <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
            </div>
            <div className="my-3 flex w-fit items-center gap-1 rounded-lg bg-gray-200 px-3 py-1 text-sm md:hidden">
              <span className="text-primary">★</span>
              {exam.rating}
              <span className="text-[10px] text-gray-600">
                ({exam.reviewCount?.toLocaleString()})
              </span>
            </div>
            {/* Product Images - Left Side */}
            <div className="sticky top-4 h-fit rounded-lg bg-white p-4">
              <ProductImagesSlider images={exam.images} />
              <div className="mt-4 hidden gap-2 md:flex">
                <QuantitySelector
                  productId={cartProduct?.id ?? ""}
                  initialQuantity={cartProduct?.quantity}
                  min={1}
                  max={cartProduct?.stock}
                  buttonSize="md"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  disabled={loading}
                  onClick={handleAddToCart}
                  className={`flex w-full items-center justify-center gap-2 rounded-sm ${
                    loading
                      ? "cursor-not-allowed bg-green-400"
                      : "bg-green-600 hover:bg-green-700"
                  } px-4 py-2 text-sm font-semibold text-white uppercase transition-all duration-300`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add To Cart
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
          {/* Product Details - Right Side */}
          <div className="col-span-1 grid grid-cols-1 gap-3 md:col-span-5 lg:col-span-7 lg:grid-cols-7">
            <div className="col-span-1 pt-4 lg:col-span-4">
              <div className="bg-white">
                <div className="hidden md:block">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {exam.title}
                  </h1>
                </div>

                {/* Rating */}
                <div className="mt-2 hidden w-full items-center justify-between md:flex">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(exam.rating ?? 0) ? "text-primary" : "text-gray-300"} `}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 cursor-pointer text-xs text-blue-600 hover:underline">
                      {exam.rating} ★ ({exam.reviewCount?.toLocaleString()}{" "}
                      Ratings)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-800">
                      EGP {exam.discountedPrice?.toLocaleString()}
                    </span>
                    {exam.price && (
                      <>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          EGP {exam.price.toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>
                  {exam.price && (
                    <p className="flex items-center gap-2 text-xs">
                      Saving:{" "}
                      <span className="text-light-primary flex items-center gap-1 text-xs font-semibold">
                        EGP
                        <span className="text-sm">
                          {exam.price - (exam?.discountedPrice ?? 0)}
                        </span>
                      </span>
                    </p>
                  )}
                  {exam.stock && (
                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <ShoppingBag size={13} className="text-light-primary" />
                      Only {exam.stock} left in stock
                    </div>
                  )}
                </div>
                {/* Nudges Slider - Fixed to match screenshot */}
                <div className="relative mt-1 h-6 overflow-hidden">
                  <div
                    className="flex flex-col transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `translateY(-${currentNudgeIndex * 24}px)`,
                    }}
                  >
                    {exam.nudges?.map((nudge, index) => (
                      <div
                        key={index}
                        className="flex h-6 items-center text-xs text-gray-600"
                      >
                        {nudge}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skeleton */}
                <div>
                  <InfoCards />
                </div>
              </div>
            </div>
            {/* Seller and banks information  */}
            <div className="col-span-1 lg:col-span-3">
              {/* Bank Offers */}
              <div className="my-6 rounded-lg">
                <div className="font-bold">BANK OFFERS</div>
                <ul className="mt-2 space-y-1">
                  {exam.bankOffers?.map((offer, index) => (
                    <li key={index}>
                      <Link
                        href={offer.url}
                        className="flex items-center justify-between rounded-md border border-gray-300 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <Landmark size={22} className="text-primary" />
                          <span className="ml-2 text-xs">{offer.title}</span>
                        </div>
                        <ChevronRight className="text-secondary" size={15} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Seller Information */}
              <h2 className="mb-2 font-bold">SELLER</h2>
              <div className="rounded-lg border border-gray-300 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <Link
                    href={"#"}
                    className="flex w-full items-center justify-between gap-3 border-b border-gray-300 p-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-primary flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                        <Store size={25} />
                      </span>
                      <div>
                        {exam.sellers && (
                          <div className="mb-1">
                            Sold by{" "}
                            <span className="text-primary text-xs underline">
                              {exam.sellers?.name}
                            </span>
                          </div>
                        )}
                        {exam.sellers && (
                          <div className="text-gray-600">
                            {exam.sellers.positiveRatings} Positive Ratings
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="text-secondary" size={15} />
                  </Link>
                </div>
                <Link
                  href={"#"}
                  className="mt-2 grid grid-cols-2 gap-3 p-3 text-sm"
                >
                  {exam.sellers && (
                    <div className="flex items-center gap-3">
                      <Archive size={16} className="text-primary" />
                      <span className="ml-1 text-sm font-semibold">
                        Item as shown
                        <ProgressLine
                          progress={exam.sellers.itemShown ?? 0}
                          height="h-1"
                          showLabel
                        />
                      </span>
                    </div>
                  )}

                  <div className="mt-1 flex items-center">
                    {exam.sellers && (
                      <div className="flex items-center gap-3 text-sm font-semibold">
                        <Handshake size={16} className="text-primary" />
                        Partner since {exam.sellers.partnerSince}
                      </div>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm font-semibold">
                    <ListRestart size={16} className="text-primary" />
                    Low return seller
                  </div>
                </Link>
              </div>
              <div className="mt-4 rounded-lg bg-white shadow-sm">
                <div className="rounded-lg border border-gray-300">
                  <div className="flex flex-col text-sm">
                    <Link
                      className="flex items-center justify-between border-b border-gray-300 p-3"
                      href={"#"}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <Truck size={16} className="text-primary" />
                        Free delivery on Lockers & Pickup Points
                      </div>
                      <ChevronRight className="text-secondary" size={15} />
                    </Link>
                    {exam.sellers && (
                      <Link
                        className="flex items-center justify-between p-3"
                        href={"#"}
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <RefreshCcw size={16} className="text-primary" />
                          {exam.sellers.returnPolicy}
                        </div>
                        <ChevronRight className="text-secondary" size={15} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
          <h1 className="border-b border-gray-300 py-2 text-2xl font-bold text-gray-600">
            Product Overview
          </h1>
          {/* products highlights  */}
          {exam.highlights && (
            <div className="mt-4 text-gray-600">
              <h2 className="mb-2 font-bold">Hightlights</h2>
              <ul className="list-disc pl-4">
                {exam.highlights?.map((highlight, index) => {
                  return (
                    <li className="text-sm" key={index}>
                      {highlight}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {/* products overview describtion  */}
          {exam.overview_desc && (
            <div className="mt-4 text-gray-600">
              <h2 className="mb-2 font-bold">OverView</h2>
              <p className="text-sm">{exam.overview_desc}</p>
            </div>
          )}
          {/* exams Specfications  */}
          {exam.specifications && (
            <div className="mt-4 text-gray-600">
              <h2 className="mb-2 font-bold">Specfications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                {exam.specifications.map((spec, index) => {
                  return (
                    <div
                      className={`flex items-center p-2 text-xs md:text-sm ${
                        // On mobile
                        index % 2 === 0 ? "bg-gray-100" : ""
                      } ${
                        // On desktop
                        Math.floor(index / 2) % 2 === 0
                          ? "md:bg-gray-100"
                          : "md:bg-transparent"
                      }`}
                      key={index}
                    >
                      <div className="w-full">{spec.label}</div>
                      <div className="w-full">{spec.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="py-8">
          <h1 className="border-b border-gray-300 py-2 text-2xl font-bold text-gray-600">
            Exam Ratings & Reviews
          </h1>
          <ProductReviews reviews={reviews} />
        </div>
        {/* Brand Products */}
        <div className="mt-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-600">
            More from {exam.category.title}
          </h2>
          <ProductsSlider exams={ExamsData}>
            {ExamsData.map((product) => (
              <div
                key={product.id}
                className="w-[280px] flex-shrink-0 md:w-[300px]"
              >
                <ExamCard {...product} />
              </div>
            ))}
          </ProductsSlider>
        </div>
        {/* Products related this Product */}
        <div className="mt-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-600">
            Exams related to this
          </h2>
          <ProductsSlider exams={ExamsData}>
            {ExamsData.map((product) => (
              <div
                key={product.id}
                className="w-[280px] flex-shrink-0 md:w-[300px]"
              >
                <ExamCard {...product} />
              </div>
            ))}
          </ProductsSlider>
        </div>
        <MobileCartNavbar
          product={exam}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default ProductPage;
