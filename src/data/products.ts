import { Product, ProductCategory } from '@/types/backend';

// Makhana product images - using hero images as placeholders
import heroMakhana from '@/assets/hero-makhana.jpg';
import heroTea from '@/assets/hero-tea.jpg';

export const makhanaProducts: Product[] = [
  {
    id: 'makhana-aa',
    sku: 'MKH-AA-001',
    name: 'AA Grade Makhana',
    description: 'Premium large-size fox nuts, perfect for snacking. The finest quality with uniform shape and superior taste.',
    category: 'makhana',
    grade: 'AA Grade (Premium)',
    images: [heroMakhana],
    basePrice: 599,
    currency: 'INR',
    variants: [
      { id: 'makhana-aa-250', productId: 'makhana-aa', name: '250g Pack', weight: '250g', price: 599, sku: 'MKH-AA-250', inStock: true },
      { id: 'makhana-aa-500', productId: 'makhana-aa', name: '500g Pack', weight: '500g', price: 1099, sku: 'MKH-AA-500', inStock: true },
      { id: 'makhana-aa-1000', productId: 'makhana-aa', name: '1kg Pack', weight: '1kg', price: 1999, sku: 'MKH-AA-1000', inStock: true },
    ],
    inStock: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'makhana-a',
    sku: 'MKH-A-001',
    name: 'A Grade Makhana',
    description: 'Medium-sized versatile fox nuts ideal for cooking and snacking. Great quality at affordable price.',
    category: 'makhana',
    grade: 'A Grade (Medium)',
    images: [heroMakhana],
    basePrice: 449,
    currency: 'INR',
    variants: [
      { id: 'makhana-a-250', productId: 'makhana-a', name: '250g Pack', weight: '250g', price: 449, sku: 'MKH-A-250', inStock: true },
      { id: 'makhana-a-500', productId: 'makhana-a', name: '500g Pack', weight: '500g', price: 849, sku: 'MKH-A-500', inStock: true },
      { id: 'makhana-a-1000', productId: 'makhana-a', name: '1kg Pack', weight: '1kg', price: 1599, sku: 'MKH-A-1000', inStock: true },
    ],
    inStock: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'makhana-standard',
    sku: 'MKH-STD-001',
    name: 'Standard Grade Makhana',
    description: 'Small-sized cost-effective makhana, perfect for bulk cooking and recipes.',
    category: 'makhana',
    grade: 'Standard Grade',
    images: [heroMakhana],
    basePrice: 349,
    currency: 'INR',
    variants: [
      { id: 'makhana-std-500', productId: 'makhana-standard', name: '500g Pack', weight: '500g', price: 349, sku: 'MKH-STD-500', inStock: true },
      { id: 'makhana-std-1000', productId: 'makhana-standard', name: '1kg Pack', weight: '1kg', price: 649, sku: 'MKH-STD-1000', inStock: true },
    ],
    inStock: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'makhana-mini',
    sku: 'MKH-MINI-001',
    name: 'Mini Grade Makhana',
    description: 'Tiny makhana perfect for recipes, raita, and bulk commercial use.',
    category: 'makhana',
    grade: 'Mini Grade',
    images: [heroMakhana],
    basePrice: 299,
    currency: 'INR',
    variants: [
      { id: 'makhana-mini-500', productId: 'makhana-mini', name: '500g Pack', weight: '500g', price: 299, sku: 'MKH-MINI-500', inStock: true },
      { id: 'makhana-mini-1000', productId: 'makhana-mini', name: '1kg Pack', weight: '1kg', price: 549, sku: 'MKH-MINI-1000', inStock: true },
    ],
    inStock: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'makhana-brown',
    sku: 'MKH-BRN-001',
    name: 'Brown Quality Makhana',
    description: 'Unpolished brown makhana with natural color, ideal for roasting and traditional recipes.',
    category: 'makhana',
    grade: 'Brown Quality',
    images: [heroMakhana],
    basePrice: 399,
    currency: 'INR',
    variants: [
      { id: 'makhana-brn-500', productId: 'makhana-brown', name: '500g Pack', weight: '500g', price: 399, sku: 'MKH-BRN-500', inStock: true },
      { id: 'makhana-brn-1000', productId: 'makhana-brown', name: '1kg Pack', weight: '1kg', price: 749, sku: 'MKH-BRN-1000', inStock: true },
    ],
    inStock: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'makhana-broken',
    sku: 'MKH-BRK-001',
    name: 'Broken Quality Makhana',
    description: 'Economical broken makhana pieces for cooking, processing, and commercial food preparation.',
    category: 'makhana',
    grade: 'Broken Quality',
    images: [heroMakhana],
    basePrice: 199,
    currency: 'INR',
    variants: [
      { id: 'makhana-brk-500', productId: 'makhana-broken', name: '500g Pack', weight: '500g', price: 199, sku: 'MKH-BRK-500', inStock: true },
      { id: 'makhana-brk-1000', productId: 'makhana-broken', name: '1kg Pack', weight: '1kg', price: 349, sku: 'MKH-BRK-1000', inStock: true },
    ],
    inStock: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const teaProducts: Product[] = [
  {
    id: 'tea-gold',
    sku: 'TEA-GLD-001',
    name: 'Premium Gold Tea',
    description: 'Exquisite golden tips from the finest tea gardens. Rich aroma with smooth finish.',
    category: 'tea',
    images: [heroTea],
    basePrice: 499,
    currency: 'INR',
    variants: [
      { id: 'tea-gold-100', productId: 'tea-gold', name: '100g Pack', weight: '100g', price: 499, sku: 'TEA-GLD-100', inStock: true },
      { id: 'tea-gold-250', productId: 'tea-gold', name: '250g Pack', weight: '250g', price: 1149, sku: 'TEA-GLD-250', inStock: true },
      { id: 'tea-gold-500', productId: 'tea-gold', name: '500g Pack', weight: '500g', price: 2099, sku: 'TEA-GLD-500', inStock: true },
    ],
    inStock: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'tea-elaichi',
    sku: 'TEA-ELC-001',
    name: 'Elaichi Tea',
    description: 'Aromatic cardamom-infused tea blend. The perfect traditional chai experience.',
    category: 'tea',
    images: [heroTea],
    basePrice: 399,
    currency: 'INR',
    variants: [
      { id: 'tea-elc-100', productId: 'tea-elaichi', name: '100g Pack', weight: '100g', price: 399, sku: 'TEA-ELC-100', inStock: true },
      { id: 'tea-elc-250', productId: 'tea-elaichi', name: '250g Pack', weight: '250g', price: 899, sku: 'TEA-ELC-250', inStock: true },
      { id: 'tea-elc-500', productId: 'tea-elaichi', name: '500g Pack', weight: '500g', price: 1699, sku: 'TEA-ELC-500', inStock: true },
    ],
    inStock: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'tea-masala',
    sku: 'TEA-MSL-001',
    name: 'Masala Chai Blend',
    description: 'Traditional spiced tea with ginger, cinnamon, and cloves. Coming Soon!',
    category: 'tea',
    images: [heroTea],
    basePrice: 449,
    currency: 'INR',
    variants: [
      { id: 'tea-msl-100', productId: 'tea-masala', name: '100g Pack', weight: '100g', price: 449, sku: 'TEA-MSL-100', inStock: false },
    ],
    inStock: false,
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const categories: { id: ProductCategory; name: string; description: string; available: boolean }[] = [
  {
    id: 'makhana',
    name: 'Makhana',
    description: 'Premium Fox Nuts from Bihar',
    available: true,
  },
  {
    id: 'tea',
    name: 'Tea',
    description: 'Aromatic Tea Blends',
    available: true,
  },
  {
    id: 'jaggery',
    name: 'Gud & Sakar',
    description: 'Traditional Sweeteners',
    available: false,
  },
];

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  switch (category) {
    case 'makhana':
      return makhanaProducts;
    case 'tea':
      return teaProducts;
    default:
      return [];
  }
};
