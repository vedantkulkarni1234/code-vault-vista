import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PasswordGenerator from '@/components/PasswordGenerator';
import PasswordSphere from '@/components/PasswordSphere';
import PythonToolShowcase from '@/components/PythonToolShowcase';
import { Coffee, Book, Code, ShieldCheck, Lock, Key } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((elem: any) => {
        const speed = elem.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        elem.style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20">
          <div className="absolute inset-0 hero-gradient -z-10"></div>
          
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-glow text-coder-purple">SecureVault</span> 
                <br />
                <span className="text-white">Password Manager</span>
              </h1>
              
              <p className="text-lg text-gray-300 max-w-lg">
                Generate strong, unique passwords and keep your online accounts secure. 
                Built with advanced encryption techniques by developers, for everyone.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="#password-tool">
                  <Button className="bg-coder-purple hover:bg-coder-blue transition-colors text-white">
                    Try it now
                  </Button>
                </Link>
                
                <Link to="/guide">
                  <Button variant="outline" className="border-gray-500 hover:border-coder-purple">
                    <Book className="mr-2 h-4 w-4" />
                    User Guide
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck className="h-4 w-4 text-coder-green" />
                <span>Your passwords are never stored or transmitted</span>
              </div>
            </div>
            
            <div className="relative h-80 sm:h-96 md:h-[500px] -z-10 parallax" data-speed="0.1">
              <PasswordSphere />
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Link to="#password-tool" className="text-gray-400 hover:text-coder-purple transition-colors">
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2">Try it now</span>
                <div className="w-6 h-6 border-b-2 border-r-2 border-gray-400 rotate-45"></div>
              </div>
            </Link>
          </div>
        </section>
        
        {/* Password Generator Tool Section */}
        <section id="password-tool" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Generate Secure Passwords
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Use our advanced tool to create strong, unique passwords that are 
                difficult to crack but easy to use.
              </p>
            </div>
            
            <div className="mx-auto">
              <PasswordGenerator />
            </div>
          </div>
        </section>
        
        {/* Python Tool Showcase Section */}
        <PythonToolShowcase />
        
        {/* Features Section */}
        <section className="py-20 bg-coder-dark relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our password manager gives you the tools you need to stay secure in a digital world.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-border bg-secondary p-6">
                <div className="mb-4 p-3 bg-coder-purple bg-opacity-20 inline-block rounded-lg">
                  <Key className="h-6 w-6 text-coder-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Strong Encryption</h3>
                <p className="text-gray-400">
                  Industry-standard algorithms protect your sensitive information.
                </p>
              </Card>
              
              <Card className="card-border bg-secondary p-6">
                <div className="mb-4 p-3 bg-coder-blue bg-opacity-20 inline-block rounded-lg">
                  <Lock className="h-6 w-6 text-coder-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Password Strength Analysis</h3>
                <p className="text-gray-400">
                  Instant feedback on how secure your passwords are.
                </p>
              </Card>
              
              <Card className="card-border bg-secondary p-6">
                <div className="mb-4 p-3 bg-coder-green bg-opacity-20 inline-block rounded-lg">
                  <Code className="h-6 w-6 text-coder-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Developer Focused</h3>
                <p className="text-gray-400">
                  Built by developers with security and usability in mind.
                </p>
              </Card>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute top-20 left-10 w-40 h-40 border border-coder-purple rounded-full opacity-10 animate-pulse-slow"></div>
          <div className="hidden md:block absolute bottom-20 right-10 w-60 h-60 border border-coder-blue rounded-full opacity-10 animate-pulse-slow"></div>
        </section>
        
        {/* Support Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl font-bold mb-4">Support This Project</h2>
              <p className="text-gray-400 mb-8">
                If you find this tool useful in your daily work or personal life, consider supporting its development. 
                Every contribution helps maintain and improve this free, open-source project.
              </p>
              
              <Link to="/donate">
                <Button className="bg-coder-purple hover:bg-coder-blue transition-colors">
                  <Coffee className="mr-2 h-5 w-5" />
                  Buy me a coffee
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative code snippet in background */}
          <div className="absolute -bottom-10 -left-10 w-1/2 opacity-5 transform -rotate-12">
            <div className="code-snippet text-xs sm:text-sm">
              <pre>
                <code className="text-coder-purple">
                  {`function generatePassword(length, options) {
  const charset = getCharset(options);
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(
      Math.random() * charset.length
    );
    password += charset[randomIndex];
  }
  
  return password;
}`}
                </code>
              </pre>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
