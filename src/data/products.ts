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
}

export const products: Product[] = [
  {
    id: "aa-grade",
    title: "Premium AA Grade Makhana",
    subtitle: "The Royal Harvest",
    grade: "5A+ Size (22mm+)",
    image: "/assets/products/makhana-aa-real.jpg",
    description: "Experience the ultimate crunch with our hand-picked AA Grade Makhana. These extra-large, snow-white fox nuts are the pinnacle of quality, sourced from the finest crops in Madhubani. Perfectly round and bursting with nutrition, they are the ideal guilt-free luxury snack.",
    price: "₹600 / kg",
    features: ["Largest 5A+ Size", "99% Popping Ratio", "Farm Fresh", "Pesticide Free"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["250g Zip Lock", "500g Jar", "1kg Premium Box"],
    bannerImage: "/assets/makhana-harvest-bg.png"
  },
  {
    id: "a-grade",
    title: "Standard A Grade Makhana",
    subtitle: "Everyday Wellness",
    grade: "4A Size (19mm+)",
    image: "/assets/products/makhana-a.jpg",
    secondaryImage: "/assets/products/makhana-a-back.jpg",
    description: "Our Standard A Grade Makhana offers the perfect balance of quality and value. Crisp, light, and naturally delicious, these fox nuts are perfect for daily snacking, roasting, or adding to curries. Sourced from authentic Bihar wetlands.",
    price: "₹500 / kg",
    features: ["Uniform Size", "High Quality", "Natural Taste", "Rich in Calcium"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["500g Pouch", "1kg Pack"],
    bannerImage: "/assets/makhana-harvest-bg.png"
  },
  {
    id: "mini-grade",
    title: "Mini Grade Makhana",
    subtitle: "Smart Snacking",
    grade: "3A Size",
    image: "/assets/products/makhana-mini-real.jpg",
    description: "Don't let the size fool you. Our Mini Grade Makhana packs the same nutritional punch in a bite-sized form. Perfect for trail mixes, kids' lunchboxes, or roasting with your favorite spices. Economical without compromising on health.",
    price: "₹400 / kg",
    features: ["Bite Sized", "Budget Friendly", "Same Nutrition", "Best for Roasting"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["1kg Bulk Pouch", "5kg Sack"],
    bannerImage: "/assets/makhana-harvest-bg.png"
  },
  {
    id: "combo-pack",
    title: "Family Clarity Combo",
    subtitle: "Best of Both Worlds",
    grade: "AA + A Grade Mix",
    image: "/assets/products/makhana-combo-real.jpg",
    description: "Can't decide? Get the best of both worlds with our Family Clarity Combo. Enjoy the luxury of 5A+ AA Grade for special occasions and the versatility of 4A Standard Grade for daily use. A complete health package for the entire family.",
    price: "₹1,100",
    features: ["1kg AA Grade", "1kg A Grade", "Super Saver", "Complete Nutrition"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["2kg Combo Box"],
    bannerImage: "/assets/makhana-harvest-bg.png"
  },
  {
    id: "bulk-wholesale",
    title: "Commercial Bulk Pack",
    subtitle: "Business Ready",
    grade: "Mixed / Graded",
    image: "/assets/products/makhana-bulk.jpg",
    description: "Sourcing for your bakery, restaurant, or retail brand? Our Commercial Bulk Packs offer premium quality makhana in large quantities at wholesale rates. Direct from the farm to your business, ensuring maximum freshness and profit margins.",
    price: "Enquire for Price",
    features: ["Wholesale Rates", "Consistent Supply", "Custom Grading", "Export Quality"],
    nutritionalInfo: [
      { label: "Protein", value: "9.7g" },
      { label: "Fiber", value: "14.5g" },
      { label: "Calories", value: "347 kcal" },
      { label: "Fat", value: "0.1g" },
    ],
    packaging: ["10kg Sack", "20kg Sack", "50kg Sack"],
    bannerImage: "/assets/makhana-harvest-bg.png"
  }
];
