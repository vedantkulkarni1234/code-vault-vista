
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Coffee, Book, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-coder-darker bg-opacity-80 backdrop-blur-md py-2 shadow-lg' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Code className="h-6 w-6 text-coder-purple" />
          <span className="font-mono font-bold text-xl">
            <span className="text-glow text-coder-purple">Secure</span>
            <span className="text-white">Vault</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-coder-purple transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/guide" 
            className="text-gray-300 hover:text-coder-purple transition-colors font-medium"
          >
            Guide
          </Link>
          <Link to="/donate">
            <Button variant="outline" size="sm" className="border-coder-purple text-coder-purple hover:bg-coder-purple hover:text-white">
              <Coffee className="mr-2 h-4 w-4" />
              Support
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-300 hover:text-coder-purple"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-coder-darker bg-opacity-95 backdrop-blur-lg py-4 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-coder-purple transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/guide" 
              className="text-gray-300 hover:text-coder-purple transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Guide
            </Link>
            <Link 
              to="/donate"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="outline" size="sm" className="border-coder-purple text-coder-purple hover:bg-coder-purple hover:text-white w-full">
                <Coffee className="mr-2 h-4 w-4" />
                Support
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
