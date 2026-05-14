import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Gold Glossary', path: '/glossary' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Sage AI', path: '/sage' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="nav-logo cinzel">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            SWARNA VIGYAN
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links-desktop">
          {links.map((link, idx) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="nav-toggle-mobile" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X color="var(--gold-metallic)" /> : <Menu color="var(--gold-metallic)" />}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <motion.div 
          className="nav-menu-mobile"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="nav-link-mobile cinzel"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
