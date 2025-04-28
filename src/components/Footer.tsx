
import { Link } from 'react-router-dom';
import { Code, Coffee, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-coder-darker py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-coder-purple" />
              <span className="font-mono font-bold text-xl">
                <span className="text-glow text-coder-purple">Secure</span>
                <span className="text-white">Vault</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              A secure password manager designed with a coder's mindset. 
              Keep your digital life safe with strong encryption and user-friendly tools.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium text-lg">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-400 hover:text-coder-purple transition-colors">
                Home
              </Link>
              <Link to="/guide" className="text-gray-400 hover:text-coder-purple transition-colors">
                User Guide
              </Link>
              <Link to="/donate" className="text-gray-400 hover:text-coder-purple transition-colors">
                Support Development
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium text-lg">Support</h3>
            <p className="text-gray-400 text-sm">
              If you find this tool useful, consider supporting its development.
            </p>
            <Link to="/donate" className="inline-flex items-center gap-2 text-coder-purple hover:text-coder-blue transition-colors">
              <Coffee className="h-4 w-4" />
              <span>Buy me a coffee</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SecureVault Password Manager. All rights reserved.
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coder-purple to-transparent opacity-30"></div>
    </footer>
  );
};

export default Footer;
