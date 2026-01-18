import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Truck, 
  MapPin,
  ChevronRight,
  Lock,
  Check
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/hooks/useCart';
import { PaymentMethod, Address } from '@/types/backend';
import { toast } from '@/hooks/use-toast';
import upiQr from '@/assets/upi-qr.jpeg';

type CheckoutStep = 'address' | 'payment' | 'review';

const paymentMethods: { id: PaymentMethod; name: string; icon: typeof CreditCard; description: string }[] = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay via any UPI app' },
  { id: 'razorpay', name: 'Razorpay', icon: Wallet, description: 'Cards, Netbanking, Wallets' },
  { id: 'credit_card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
  { id: 'cod', name: 'Cash on Delivery', icon: Truck, description: 'Pay when delivered' },
];

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('upi');
  const [showUpiQr, setShowUpiQr] = useState(false);
  const [address, setAddress] = useState<Partial<Address>>({
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    deliveryInstructions: '',
  });

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = () => {
    // TODO: Backend integration - validate address
    if (!address.firstName || !address.phone || !address.addressLine1 || !address.city || !address.postalCode) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = () => {
    setCurrentStep('review');
    if (selectedPayment === 'upi') {
      setShowUpiQr(true);
    }
  };

  const handlePlaceOrder = () => {
    // TODO: Backend integration points:
    // 1. Create order in database
    // 2. Process payment via selected gateway
    // 3. Send confirmation email
    // 4. Update inventory
    
    console.log('Order data (ready for backend integration):', {
      items,
      address,
      payment: selectedPayment,
      subtotal,
      shipping,
      total,
    });

    toast({
      title: 'Order Placed!',
      description: 'Thank you for your order. You will receive a confirmation soon.',
    });

    clearCart();
    // TODO: Redirect to order confirmation page
  };

  const detectLocation = async () => {
    // TODO: Backend integration - Use Google Maps API or similar
    toast({
      title: 'Location Detection',
      description: 'This feature will be enabled with backend integration.',
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some items before checkout.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { id: 'address', label: 'Address' },
              { id: 'payment', label: 'Payment' },
              { id: 'review', label: 'Review' },
            ].map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep === step.id
                      ? 'bg-primary text-primary-foreground'
                      : step.id === 'address' || 
                        (step.id === 'payment' && currentStep !== 'address') ||
                        (step.id === 'review' && currentStep === 'review')
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm hidden sm:inline">{step.label}</span>
                {index < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground ml-4" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Address Step */}
                {currentStep === 'address' && (
                  <div className="glass-card p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-xl font-semibold">Delivery Address</h2>
                      <button
                        onClick={detectLocation}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <MapPin className="w-4 h-4" />
                        Detect Location
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={address.firstName}
                          onChange={handleAddressChange}
                          className="input-premium"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={address.lastName}
                          onChange={handleAddressChange}
                          className="input-premium"
                          placeholder="Last name"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={address.phone}
                          onChange={handleAddressChange}
                          className="input-premium"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-2">Address Line 1 *</label>
                        <input
                          type="text"
                          name="addressLine1"
                          value={address.addressLine1}
                          onChange={handleAddressChange}
                          className="input-premium"
                          placeholder="House/Flat number, Street"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-2">Address Line 2</label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={address.addressLine2}
                          onChange={handleAddressChange}
                          className="input-premium"
                          placeholder="Landmark, Area"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={address.city}
                          onChange={handleAddressChange}
                          className="input-premium"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={address.state}
                          onChange={handleAddressChange}
                          className="input-premium"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">PIN Code *</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={address.postalCode}
                          onChange={handleAddressChange}
                          className="input-premium"
                          placeholder="110001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={address.country}
                          disabled
                          className="input-premium opacity-60"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-2">Delivery Instructions</label>
                        <textarea
                          name="deliveryInstructions"
                          value={address.deliveryInstructions}
                          onChange={handleAddressChange}
                          className="input-premium resize-none"
                          rows={2}
                          placeholder="Any special instructions for delivery"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleAddressSubmit}
                      className="btn-premium w-full mt-6 flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === 'payment' && (
                  <div className="glass-card p-6 md:p-8">
                    <h2 className="font-display text-xl font-semibold mb-6">Payment Method</h2>

                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            selectedPayment === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <method.icon className="w-6 h-6" />
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">{method.description}</div>
                          </div>
                          {selectedPayment === method.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setCurrentStep('address')}
                        className="flex-1 py-3 px-6 rounded-xl border border-border hover:bg-muted transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePaymentSubmit}
                        className="btn-premium flex-1 flex items-center justify-center gap-2"
                      >
                        Review Order
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Review Step */}
                {currentStep === 'review' && (
                  <div className="space-y-6">
                    {/* UPI QR Code */}
                    {showUpiQr && selectedPayment === 'upi' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6 text-center"
                      >
                        <h3 className="font-display text-lg font-semibold mb-4">Scan to Pay</h3>
                        <div className="bg-white p-4 rounded-xl inline-block mb-4">
                          <img src={upiQr} alt="UPI QR Code" className="w-48 h-48 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          UPI ID: yespay.smessi24534@yesbankltd
                        </p>
                        <p className="text-lg font-semibold mt-2">
                          Amount: {formatPrice(total)}
                        </p>
                      </motion.div>
                    )}

                    {/* Order Summary */}
                    <div className="glass-card p-6">
                      <h3 className="font-display text-lg font-semibold mb-4">Delivery Address</h3>
                      <p className="text-muted-foreground">
                        {address.firstName} {address.lastName}<br />
                        {address.addressLine1}<br />
                        {address.addressLine2 && <>{address.addressLine2}<br /></>}
                        {address.city}, {address.state} - {address.postalCode}<br />
                        Phone: {address.phone}
                      </p>
                    </div>

                    <div className="glass-card p-6">
                      <h3 className="font-display text-lg font-semibold mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.product.name} ({item.variant.weight}) × {item.quantity}
                            </span>
                            <span className="font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep('payment')}
                        className="flex-1 py-3 px-6 rounded-xl border border-border hover:bg-muted transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        className="btn-premium flex-1 flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.product.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {item.variant.weight} × {item.quantity}
                        </p>
                        <p className="font-medium text-sm mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  Secure checkout powered by industry-standard encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
