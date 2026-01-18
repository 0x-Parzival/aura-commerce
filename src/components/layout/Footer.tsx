import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Genus Agro Foods" className="h-12 w-auto" />
            <p className="text-muted-foreground text-sm">
              Premium Makhana & Tea from the heart of India. Quality you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/makhana" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Makhana
              </Link>
              <Link to="/tea" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Tea
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:+919873961111" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +91-9873961111
              </a>
              <a href="https://wa.me/919911593677" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-secondary" />
                WhatsApp: +91-9911593677
              </a>
              <a href="mailto:info@genusagrofoods.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                info@genusagrofoods.com
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Our Offices</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>B-720/721, Ithum Tower, Sector-62, Noida, UP 201301</span>
              </div>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>Factory: Majhaura Benipur, Darbhanga, Bihar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Genusagro Foods Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>GSTIN: 09AAMCG1236H1ZK</span>
            <span>FSSAI: 12725999000608</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
