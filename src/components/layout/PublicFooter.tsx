import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { hotelInfo } from '@/lib/data';

const footerLinks = {
  explore: [
    { label: 'Our Rooms', href: '/rooms' },
    { label: 'Amenities', href: '/amenities' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Guest Stories', href: '/reviews' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function PublicFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-primary font-serif font-bold text-xl">V</span>
              </div>
              <span className="font-serif text-xl font-semibold">{hotelInfo.fullName}</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {hotelInfo.shortDescription}
            </p>
            <div className="flex gap-4">
              <a href={hotelInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={hotelInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={hotelInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-accent" />
                <span className="text-primary-foreground/70 text-sm">
                  {hotelInfo.address.line1}, {hotelInfo.address.city},<br />{hotelInfo.address.state} {hotelInfo.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href={`tel:${hotelInfo.contact.phone.replace(/\s/g, '')}`} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  {hotelInfo.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href={`mailto:${hotelInfo.contact.email}`} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  {hotelInfo.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} {hotelInfo.fullName}. Crafted with love in {hotelInfo.address.city}.
          </p>
          <p className="text-primary-foreground/50 text-sm">
            Privacy Policy • Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
