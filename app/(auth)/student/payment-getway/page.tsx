"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/radio-group";
import { Separator } from "@/components/UI/separator";
import { Badge } from "@/components/UI/badge";
import {
  CreditCard,
  Lock,
  CheckCircle2,
  Loader2,
  Shield,
  ArrowLeft,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Wallet,
  Search,
  ShoppingCart,
  LibraryBig,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { formatMoney } from "@/util/general";

interface PaymentItem {
  id: string;
  type: "course" | "bundle";
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  instructor?: string;
}

function PaymentGatewayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // Get payment details from URL params
  const itemId = searchParams.get("itemId");
  const itemType = searchParams.get("type") as "course" | "bundle";
  const couponCode = searchParams.get("coupon");

  // State management
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentItem, setPaymentItem] = useState<PaymentItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [appliedCoupon, setAppliedCoupon] = useState(couponCode || "");
  const [discount, setDiscount] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch payment item details
  useEffect(() => {
    const fetchPaymentItem = async () => {
      if (!itemId || !itemType) {
        // If no params, just show empty state instead of redirecting
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch(`/api/${itemType}/${itemId}`);
        if (!response.ok) throw new Error("Failed to fetch item");
        
        const data = await response.json();
        setPaymentItem({
          id: data.id,
          type: itemType,
          name: data.name || data.title,
          image: data.image || data.thumbnail,
          price: data.price,
          salePrice: data.salePrice,
          instructor: data.instructor?.name,
        });
      } catch (error) {
        toast.error("Failed to load payment details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentItem();
  }, [itemId, itemType]);

  // Calculate final price
  const calculateTotal = () => {
    if (!paymentItem) return 0;
    const basePrice = paymentItem.salePrice || paymentItem.price;
    const discountAmount = (basePrice * discount) / 100;
    return basePrice - discountAmount;
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "card") {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length !== 16) {
        newErrors.cardNumber = "Valid card number is required";
      }
      if (!formData.cardName || formData.cardName.length < 3) {
        newErrors.cardName = "Cardholder name is required";
      }
      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Valid expiry date (MM/YY) is required";
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = "Valid CVV is required";
      }
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Format card number
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Apply coupon
  const handleApplyCoupon = async () => {
    if (!appliedCoupon.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: appliedCoupon,
          itemId: paymentItem?.id,
          itemType: paymentItem?.type,
        }),
      });

      if (!response.ok) throw new Error("Invalid coupon");

      const data = await response.json();
      setDiscount(data.discount);
      toast.success(`Coupon applied! ${data.discount}% discount`);
    } catch (error) {
      toast.error("Invalid or expired coupon code");
      console.error(error);
    }
  };

  // Handle payment submission
  const handlePayment = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setProcessing(true);

    try {
      // TODO: Replace with actual payment API integration (Stripe, PayPal, etc.)
      const response = await fetch("/api/payment/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: paymentItem?.id,
          itemType: paymentItem?.type,
          amount: calculateTotal(),
          paymentMethod,
          couponCode: discount > 0 ? appliedCoupon : null,
          billingDetails: formData,
        }),
      });

      if (!response.ok) throw new Error("Payment failed");

      const result = await response.json();

      toast.success("Payment successful!");
      router.push(`/student/payment/success?orderId=${result.orderId}`);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!paymentItem) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Secure Payment Gateway</h1>
          <p className="text-muted-foreground text-lg">
            {itemId && itemType 
              ? "Unable to load payment details. Please try again."
              : "Fast, secure, and trusted payment processing for your learning journey"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg">Secure & Encrypted</h3>
              <p className="text-sm text-muted-foreground">
                Your payment information is protected with bank-level 256-bit SSL encryption
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg">Multiple Payment Options</h3>
              <p className="text-sm text-muted-foreground">
                Pay with credit cards, debit cards, or PayPal - whatever works best for you
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg">Money-Back Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                30-day refund policy on all courses - no questions asked
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  1
                </div>
                <h4 className="font-semibold">Choose Course</h4>
                <p className="text-sm text-muted-foreground">
                  Browse and select the course or bundle you want
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  2
                </div>
                <h4 className="font-semibold">Add to Cart</h4>
                <p className="text-sm text-muted-foreground">
                  Review your selection and apply coupon codes
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  3
                </div>
                <h4 className="font-semibold">Complete Payment</h4>
                <p className="text-sm text-muted-foreground">
                  Enter your payment details securely
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  4
                </div>
                <h4 className="font-semibold">Start Learning</h4>
                <p className="text-sm text-muted-foreground">
                  Get instant access to your course content
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accepted Payment Methods */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Accepted Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-6 py-4">
              <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Credit Card</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Debit Card</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <Building className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">PayPal</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              All major credit and debit cards accepted
            </p>
          </CardContent>
        </Card>

        {/* Security Badge */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Shield className="h-12 w-12 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Your Security is Our Priority</h3>
                  <p className="text-sm text-muted-foreground">
                    We use industry-standard encryption and never store your card details
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Lock className="h-8 w-8 text-green-600" />
                <div className="text-center">
                  <p className="text-xs font-medium text-muted-foreground">SSL Secured</p>
                  <p className="text-xs text-green-600 font-bold">256-bit Encryption</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12 space-y-4">
          <h2 className="text-2xl font-bold">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6">
            Explore our wide range of courses and bundles
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              onClick={() => router.push("/courses")} 
              size="lg"
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Browse All Courses
            </Button>
            <Button 
              onClick={() => router.push("/cart")} 
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              View Cart
            </Button>
            <Button 
              onClick={() => router.push("/student/my-courses")} 
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <LibraryBig className="h-4 w-4" />
              My Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const finalPrice = calculateTotal();
  const originalPrice = paymentItem.price;
  const currentPrice = paymentItem.salePrice || paymentItem.price;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Secure Checkout</h1>
        <p className="text-muted-foreground mt-2">
          Complete your purchase securely
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-4 w-4" />
                    Credit / Debit Card
                  </Label>
                  <div className="flex gap-2">
                    <Image src="/images/visa.png" alt="Visa" width={40} height={25} className="object-contain" />
                    <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={25} className="object-contain" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Building className="h-4 w-4" />
                    PayPal
                  </Label>
                  <Image src="/images/paypal.png" alt="PayPal" width={60} height={25} className="object-contain" />
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Card Details */}
          {paymentMethod === "card" && (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", formatCardNumber(e.target.value))
                      }
                      maxLength={19}
                      className={errors.cardNumber ? "border-destructive" : ""}
                    />
                    <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder Name *</Label>
                  <div className="relative">
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value)}
                      className={errors.cardName ? "border-destructive" : ""}
                    />
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.cardName && (
                    <p className="text-sm text-destructive mt-1">{errors.cardName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", formatExpiryDate(e.target.value))
                      }
                      maxLength={5}
                      className={errors.expiryDate ? "border-destructive" : ""}
                    />
                    {errors.expiryDate && (
                      <p className="text-sm text-destructive mt-1">{errors.expiryDate}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={formData.cvv}
                      onChange={(e) =>
                        handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      maxLength={4}
                      className={errors.cvv ? "border-destructive" : ""}
                    />
                    {errors.cvv && (
                      <p className="text-sm text-destructive mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Street Address *</Label>
                <div className="relative">
                  <Input
                    id="address"
                    placeholder="123 Main Street, Apt 4B"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">ZIP / Postal Code *</Label>
                  <Input
                    id="zipCode"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className={errors.zipCode ? "border-destructive" : ""}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className={errors.country ? "border-destructive" : ""}
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive mt-1">{errors.country}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. We never store
                    your card details on our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Item Details */}
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={paymentItem.image || "/placeholder-course.jpg"}
                      alt={paymentItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2">{paymentItem.name}</h3>
                    {paymentItem.instructor && (
                      <p className="text-sm text-muted-foreground mt-1">
                        By {paymentItem.instructor}
                      </p>
                    )}
                    <Badge variant="outline" className="mt-2 capitalize">
                      {paymentItem.type}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Coupon Code */}
                <div className="space-y-2">
                  <Label htmlFor="coupon">Coupon Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      placeholder="Enter code"
                      value={appliedCoupon}
                      onChange={(e) => setAppliedCoupon(e.target.value.toUpperCase())}
                      disabled={discount > 0}
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      variant={discount > 0 ? "outline" : "default"}
                      disabled={discount > 0}
                    >
                      {discount > 0 ? <CheckCircle2 className="h-4 w-4" /> : "Apply"}
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Coupon applied successfully!
                    </p>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Original Price</span>
                    <span className={originalPrice !== currentPrice ? "line-through" : ""}>
                      {formatMoney(originalPrice)}
                    </span>
                  </div>

                  {paymentItem.salePrice && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sale Price</span>
                      <span className="text-green-600 font-medium">
                        {formatMoney(currentPrice)}
                      </span>
                    </div>
                  )}

                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Coupon Discount ({discount}%)
                      </span>
                      <span className="text-green-600 font-medium">
                        -{formatMoney((currentPrice * discount) / 100)}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatMoney(finalPrice)}</span>
                  </div>
                </div>

                <Separator />

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Pay {formatMoney(finalPrice)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing this purchase you agree to our{" "}
                  <a href="/terms" className="underline hover:text-primary">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Money Back Guarantee */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">30-Day Money-Back Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    Not satisfied? Get a full refund within 30 days, no questions asked.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentGatewayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading payment gateway...</p>
          </div>
        </div>
      }
    >
      <PaymentGatewayContent />
    </Suspense>
  );
}
