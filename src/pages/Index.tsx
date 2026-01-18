import { motion } from 'framer-motion';
import CategoryCard from '@/components/home/CategoryCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import heroBg from '@/assets/hero-bg.jpg';
import heroMakhana from '@/assets/hero-makhana.jpg';
import heroTea from '@/assets/hero-tea.jpg';
import heroJaggery from '@/assets/hero-jaggery.jpg';

const categories = [
  {
    id: 'makhana',
    name: 'Makhana',
    description: 'Premium Fox Nuts from Bihar - Rich in protein, fiber & antioxidants',
    image: heroMakhana,
    available: true,
  },
  {
    id: 'tea',
    name: 'Tea',
    description: 'Aromatic Tea Blends - Traditional flavors, premium quality',
    image: heroTea,
    available: true,
  },
  {
    id: 'jaggery',
    name: 'Gud & Sakar',
    description: 'Traditional Sweeteners - Natural, unrefined goodness',
    image: heroJaggery,
    available: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1 relative">
        {/* Background */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-background/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center pt-24 pb-16">
          {/* Hero Text */}
          <motion.div 
            className="container mx-auto px-4 text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-brand">Premium</span>{' '}
              <span className="text-foreground">Agro Products</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From the heart of Bihar to your table. Experience authentic, 
              high-quality superfoods crafted with tradition and care.
            </p>
          </motion.div>

          {/* Category Cards - Desktop: Centered Grid, Mobile: Carousel */}
          <div className="hidden md:block container mx-auto px-4">
            <div className="flex justify-center gap-8 flex-wrap">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  {...category}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="flex gap-6 overflow-x-auto scroll-snap-x hide-scrollbar px-4 py-4">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  {...category}
                  delay={index * 0.15}
                />
              ))}
            </div>
            <p className="text-center text-muted-foreground text-sm mt-4">
              ← Swipe to explore →
            </p>
          </div>

          {/* Trust Badges */}
          <motion.div 
            className="container mx-auto px-4 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-center">
              {[
                { label: 'FSSAI Certified', value: '12725999000608' },
                { label: 'Quality Assured', value: 'ISO Standards' },
                { label: 'Born in Bihar', value: 'Loved Worldwide' },
              ].map((badge) => (
                <div key={badge.label} className="glass-card px-6 py-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {badge.label}
                  </div>
                  <div className="text-sm font-semibold text-foreground mt-1">
                    {badge.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
