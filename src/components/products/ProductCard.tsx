import { useState } from 'react';
import { Product } from '@/types/backend';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard = ({ product, delay = 0 }: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {product.grade && (
          <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
            {product.grade}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-xl font-semibold">{product.name}</h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Variant Selector */}
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              disabled={!variant.inStock}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-300 ${
                selectedVariant.id === variant.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : variant.inStock
                  ? 'border-border hover:border-primary/50 hover:bg-muted'
                  : 'opacity-50 cursor-not-allowed border-border/50'
              }`}
            >
              {variant.weight}
            </button>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(selectedVariant.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant.inStock}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              isAdded
                ? 'bg-secondary text-secondary-foreground'
                : 'btn-premium'
            } ${!selectedVariant.inStock && 'opacity-50 cursor-not-allowed'}`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
