/**
 * Backend Integration Types & Interfaces
 * 
 * These interfaces define the data structures for future backend integration.
 * DO NOT implement business logic - these are placeholder schemas only.
 */

// ============ CUSTOMER TYPES ============
export interface Customer {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  addresses: Address[];
  // TODO: Backend integration - connect to auth provider
}

export interface Address {
  id: string;
  customerId: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  deliveryInstructions?: string;
  // TODO: Backend integration - validate via address API
}

// ============ PRODUCT TYPES ============
export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  grade?: string;
  images: string[];
  basePrice: number;
  currency: string;
  variants: ProductVariant[];
  inStock: boolean;
  stockQuantity?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  weight: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  inStock: boolean;
  stockQuantity?: number;
}

export type ProductCategory = 'makhana' | 'tea' | 'jaggery';

// ============ CART TYPES ============
export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  product: Product;
  variant: ProductVariant;
}

export interface Cart {
  id: string;
  customerId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============ ORDER TYPES ============
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  payment: Payment;
  delivery: Delivery;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  currency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  // TODO: Backend integration - connect to order management system
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  name: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// ============ PAYMENT TYPES ============
export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId?: string;
  gatewayResponse?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  // TODO: Backend integration points:
  // - Razorpay: Use razorpay.orders.create()
  // - UPI: Implement UPI deep linking
  // - Stripe: Use stripe.paymentIntents.create()
  // - PayPal: Use PayPal REST API
}

export type PaymentMethod = 
  | 'upi'
  | 'razorpay'
  | 'credit_card'
  | 'debit_card'
  | 'net_banking'
  | 'cod'
  | 'stripe'
  | 'paypal';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

// ============ DELIVERY TYPES ============
export interface Delivery {
  id: string;
  orderId: string;
  status: DeliveryStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  shippingMethod: ShippingMethod;
  address: Address;
  // TODO: Backend integration - connect to logistics API
}

export type DeliveryStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'returned';

export type ShippingMethod = 
  | 'standard'
  | 'express'
  | 'overnight'
  | 'international_standard'
  | 'international_express';

// ============ CONTACT FORM ============
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  // TODO: Backend integration - send to CRM or email service
}

// ============ LOCATION TYPES ============
export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface LocationDetectionResult {
  detected: boolean;
  location?: GeoLocation;
  address?: Partial<Address>;
  error?: string;
  // TODO: Backend integration - use Google Maps API or similar
}

// ============ API HOOKS (PLACEHOLDER) ============
/**
 * These are placeholder hooks for backend integration.
 * Replace with actual API implementations.
 */

export interface APIHooks {
  // Customer APIs
  createCustomer: (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Customer>;
  getCustomer: (id: string) => Promise<Customer>;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<Customer>;
  
  // Order APIs
  createOrder: (data: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  getOrder: (id: string) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<Order>;
  
  // Payment APIs
  initiatePayment: (orderId: string, method: PaymentMethod) => Promise<Payment>;
  verifyPayment: (paymentId: string) => Promise<Payment>;
  
  // Delivery APIs
  createShipment: (orderId: string, method: ShippingMethod) => Promise<Delivery>;
  trackShipment: (trackingNumber: string) => Promise<Delivery>;
  
  // Contact APIs
  submitContactForm: (data: ContactFormData) => Promise<{ success: boolean }>;
  
  // Location APIs
  detectLocation: () => Promise<LocationDetectionResult>;
  validateAddress: (address: Address) => Promise<{ valid: boolean; suggestions?: Address[] }>;
}

// Export placeholder function to demonstrate integration points
export const API_INTEGRATION_NOTES = `
==============================================
BACKEND INTEGRATION GUIDE
==============================================

1. PAYMENT GATEWAYS:
   - Razorpay: npm install razorpay, use razorpay.orders.create()
   - Stripe: npm install @stripe/stripe-js, use Stripe Elements
   - PayPal: npm install @paypal/react-paypal-js
   - UPI: Implement via Razorpay UPI or direct UPI deep links

2. DATABASE:
   - Supabase/Firebase for customer, order, product data
   - Use RLS policies for security
   
3. AUTHENTICATION:
   - Supabase Auth / Firebase Auth / Auth0
   - Implement session management
   
4. DELIVERY/LOGISTICS:
   - Shiprocket API for Indian logistics
   - DHL/FedEx for international
   - Implement webhook handlers for tracking updates
   
5. ADMIN DASHBOARD:
   - Separate admin routes with role-based access
   - Order management, inventory, analytics

==============================================
`;
