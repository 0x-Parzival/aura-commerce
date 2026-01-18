import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { teaProducts } from '@/data/products';
import heroTea from '@/assets/hero-tea.jpg';

const TeaPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] mt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroTea})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium mb-2 block">Aromatic Blends</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Tea Collection
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Traditional Indian tea blends. From premium gold tips to aromatic elaichi chai. 
              Experience the perfect cup every time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Our Tea Selection
          </h2>
          <p className="text-muted-foreground mt-2">
            Premium teas for every moment of your day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teaProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Leaves',
                description: 'Sourced from the finest tea gardens. Every leaf is carefully selected.',
              },
              {
                title: 'Traditional Blends',
                description: 'Time-honored recipes passed down through generations of tea masters.',
              },
              {
                title: 'Fresh & Aromatic',
                description: 'Packed fresh to preserve the natural aroma and flavor.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeaPage;
