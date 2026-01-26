import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { makhanaProducts } from '@/data/products';
import heroMakhana from '@/assets/hero-makhana.jpg';

const MakhanaPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroMakhana})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium mb-2 block">Premium Quality</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Makhana
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Fox Nuts from the fertile lands of Bihar. Rich in protein, fiber, and antioxidants.
              A superfood loved worldwide.
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
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Our Makhana Collection
          </h2>
          <p className="text-muted-foreground mt-2">
            Explore our diverse range of premium Fox Nuts, from retail favorites to wholesale grades.
          </p>
        </motion.div>

        {/* Retail Section */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6 text-primary border-l-4 border-primary pl-4">Retail Green Packets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {makhanaProducts.filter(p => p.id.startsWith('green-')).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Loose Makhana Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <h3 className="text-xl font-bold text-primary border-l-4 border-primary pl-4">Loose Makhana (Wholesale)</h3>
              <p className="text-sm text-muted-foreground mt-1 ml-5">Premium grades available for bulk and wholesale purchases</p>
            </div>
            <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Wholesale Pricing per kg
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {makhanaProducts.filter(p => p.id.startsWith('loose-')).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Commercial Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-primary border-l-4 border-primary pl-4">Branded Packet Makhana</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {makhanaProducts.filter(p => p.id.startsWith('packet-')).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Rich in Nutrients',
                description: 'High in protein, fiber, calcium, and magnesium. Low in fat and sodium.',
              },
              {
                title: 'Naturally Gluten-Free',
                description: 'Perfect for health-conscious consumers and those with dietary restrictions.',
              },
              {
                title: 'Farm to Table',
                description: 'Sourced directly from Bihar farmers. Full traceability and quality assurance.',
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

export default MakhanaPage;
