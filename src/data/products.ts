export interface Product {
  id: string;
  title: string;
  subtitle: string;
  grade: string;
  image: string;
  description: string;
  price: string;
  features: string[];
  nutritionalInfo: { label: string; value: string }[];
  packaging: string[];
  bannerImage: string;
  secondaryImage?: string;
  weightInGrams: number;
  originalPrice?: string;
}

export const products: Product[] = [
  {
    id: "green-premium",
    title: "Premium AA Grade Packet",
    subtitle: "Retail Exclusive",
    grade: "5A+ Size (22mm+)",
    image: "/assets/products/makhana-aa-real.jpg",
    secondaryImage: "/assets/products/green-back-portrait.png",
    description: "Our signature retail green packet. Hand-picked AA Grade Makhana, extra-large and snow-white. The pinnacle of quality, perfectly crisp and nutritious.",
    price: "₹500",
    originalPrice: "₹600",
    features: ["250gm Pack", "Premium Green Packaging", "Farm Fresh", "Pesticide Free"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["250g Green Packet"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 250
  },
  {
    id: "green-standard",
    title: "Premium A Grade Packet",
    subtitle: "Everyday Wellness",
    grade: "4A Size (19mm+)",
    image: "/assets/products/makhana-a.jpg",
    description: "Our standard retail green packet. Perfect balance of quality and value. Crisp, light, and naturally delicious fox nuts for daily healthy snacking.",
    price: "₹400",
    originalPrice: "₹500",
    features: ["250gm Pack", "Standard Green Packaging", "Natural Taste", "Rich in Calcium"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["250g Green Packet"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 250
  },
  {
    id: "loose-4-suta",
    title: "Loose Makhana (4 Suta)",
    subtitle: "Wholesale Pure",
    grade: "100% 4 Suta",
    image: "/assets/products/makhana-bulk.jpg",
    description: "High-quality loose makhana, 100% 4 suta grade. Ideal for bulk processing or value-based redistribution.",
    price: "₹750 / kg",
    features: ["Consistent 4 Suta", "Wholesale Grade", "Fresh Crop"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "loose-4-plus",
    title: "Loose Makhana (4+ Grade)",
    subtitle: "Balanced Mix",
    grade: "70% (4 Suta) - 30% (5/6 Suta)",
    image: "/assets/products/makhana-bulk.jpg",
    description: "A professional blend of 4 suta base with larger 5 and 6 suta fox nuts. Excellent for standard retail requirements.",
    price: "₹880 / kg",
    features: ["Mixed Grade 4+", "Professional Blend", "Premium Quality"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "loose-medium-mix",
    title: "Loose Makhana (Medium Mix)",
    subtitle: "Versatile Choice",
    grade: "4+5+6 (Medium)",
    image: "/assets/products/makhana-bulk.jpg",
    description: "40-40-20 ratio of 4, 5, and 6 suta grades. A highly versatile medium-sized fox nut mix suitable for all purposes.",
    price: "₹940 / kg",
    features: ["Medium Mix", "Versatile Use", "Uniform Texture"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "loose-high-mix",
    title: "Loose Makhana (High Mix)",
    subtitle: "Premium Blend",
    grade: "4+5+6 (High)",
    image: "/assets/products/makhana-bulk.jpg",
    description: "30-50-20 ratio emphasizing larger 5 suta grades. Premium loose makhana for discerning bulk buyers.",
    price: "₹980 / kg",
    features: ["High Grade Mix", "Large Average Size", "Superior Crunch"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "loose-5-6-plus",
    title: "Loose Makhana (5+6 Grade)",
    subtitle: "Large Sizing",
    grade: "70% (5 Suta) - 30% (6 Suta)",
    image: "/assets/products/makhana-bulk.jpg",
    description: "Specialized large grade mix focusing on 5 and 6 suta. Extra large popping and premium appearance.",
    price: "₹1080 / kg",
    features: ["Extra Large Size", "High Popping Ratio", "Premium Loose"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "loose-5-handpic",
    title: "Loose Makhana (Handpicked 5+)",
    subtitle: "Artisan Quality",
    grade: "70-30 (5+ Handpic)",
    image: "/assets/products/makhana-bulk.jpg",
    description: "Handpicked 5+ grade makhana ensuring zero defects and maximum size consistency. The artisan's choice.",
    price: "₹1190 / kg",
    features: ["Handpicked Selection", "Zero Defects", "Maximum Size"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "loose-6-above",
    title: "Loose Makhana (6+ Grade)",
    subtitle: "Superior Size",
    grade: "100% 6 and Above",
    image: "/assets/products/makhana-bulk.jpg",
    description: "Strictly 6 suta and above. Large, bold fox nuts that stand out in quality and taste.",
    price: "₹1280 / kg",
    features: ["Jumbo Size", "Uniform 6+ Grade", "Trophy Quality"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "loose-6-handpick",
    title: "Loose Makhana (6+ Handpick)",
    subtitle: "Elite Selection",
    grade: "100% 6 and Above (HP)",
    image: "/assets/products/makhana-loose-detailed.png",
    description: "The finest 6+ grade makhana, further refined by hand picking to ensure unparalleled perfection.",
    price: "₹1390 / kg",
    features: ["Elite Selection", "Handpicked 6+", "Maximum Boldness"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "loose-6-5-above",
    title: "Loose Makhana (6.5+ Grade)",
    subtitle: "Rare Giant Grade",
    grade: "6.5 Suta and Above",
    image: "/assets/products/makhana-loose-detailed.png",
    description: "Extremely rare giant makhana. 6.5 suta and above. The biggest fox nuts available in the market.",
    price: "₹1800 / kg",
    features: ["Giant Size", "Rarest Grade", "Ultimate Luxury"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["Loose / Bulk"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "packet-premium",
    title: "Genus Agro Premium",
    subtitle: "Packaged Excellence",
    grade: "5+ Grade",
    image: "/assets/products/makhana-green-premium.png",
    description: "Premium branded packets of 5+ grade makhana. Quality guaranteed by Genus Agro Foods.",
    price: "₹1280 / kg",
    features: ["Branded Packaging", "5+ Quality", "Freshly Packed"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["1kg Branded Packet"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "packet-bihar-bhog",
    title: "Genus Agro Bihar Bhog",
    subtitle: "Traditional Taste",
    grade: "4+ Grade",
    image: "/assets/products/makhana-biharbhog-real.png",
    description: "Authentic Bihar Bhog series makhana. 4+ grade, capturing the traditional essence of Mithila.",
    price: "₹1020 / kg",
    features: ["Bihar Bhog Branding", "4+ Quality", "Traditional Sourcing"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["1kg Branded Packet"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  },
  {
    id: "packet-bihar-bhog-hp",
    title: "Bihar Bhog Handpicked",
    subtitle: "Artisan Branded",
    grade: "6+ Handpicked",
    image: "/assets/products/makhana-biharbhog-real.png",
    description: "The crowning jewel of the Bihar Bhog series. 6+ grade, handpicked for absolute excellence.",
    price: "₹1600 / kg",
    features: ["Handpicked 6+", "Premium Branding", "Top Tier Choice"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["1kg Branded Packet"],
    bannerImage: "/assets/makhana-harvest-bg.png",
    weightInGrams: 1000
  }
];

export const makhanaProducts = products;
