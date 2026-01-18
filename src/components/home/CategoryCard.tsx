import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  available: boolean;
  delay?: number;
}

const CategoryCard = ({ id, name, description, image, available, delay = 0 }: CategoryCardProps) => {
  const content = (
    <>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            available ? 'group-hover:scale-110' : 'grayscale'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {!available && (
          <div className="absolute top-4 right-4 bg-muted/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            Coming Soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>

        <button 
          className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
            available 
              ? 'btn-premium' 
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
          disabled={!available}
        >
          {available ? 'Shop Now' : 'Not Available'}
        </button>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="scroll-snap-item flex-shrink-0 w-[320px] md:w-[360px]"
    >
      {available ? (
        <Link 
          to={`/${id}`}
          className="glass-card block group overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer animate-float"
          style={{ animationDelay: `${delay * 500}ms` }}
        >
          {content}
        </Link>
      ) : (
        <div 
          className="glass-card block group overflow-hidden transition-all duration-500 opacity-70 cursor-not-allowed"
          style={{ animationDelay: `${delay * 500}ms` }}
        >
          {content}
        </div>
      )}
    </motion.div>
  );
};

export default CategoryCard;
