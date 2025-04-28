
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import {
  ChevronRight,
  Book,
  Copy,
  Lock,
  Key,
  Shield,
  RefreshCw,
  CheckCircle,
  Coffee
} from 'lucide-react';

const Guide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-glow text-coder-purple">Password Manager</span> Guide
              </h1>
              <p className="text-xl text-gray-300">
                Learn how to use the password manager to create and manage secure passwords.
              </p>
            </div>
          </header>
          
          {/* Table of Contents */}
          <section className="mb-16">
            <Card className="card-border bg-secondary p-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <ol className="space-y-3">
                <li>
                  <a 
                    href="#getting-started" 
                    className="flex items-center text-coder-purple hover:text-coder-blue transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>Getting Started</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#generating-passwords" 
                    className="flex items-center text-coder-purple hover:text-coder-blue transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>Generating Secure Passwords</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#password-strength" 
                    className="flex items-center text-coder-purple hover:text-coder-blue transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>Understanding Password Strength</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#best-practices" 
                    className="flex items-center text-coder-purple hover:text-coder-blue transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>Password Security Best Practices</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#faq" 
                    className="flex items-center text-coder-purple hover:text-coder-blue transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>Frequently Asked Questions</span>
                  </a>
                </li>
              </ol>
            </Card>
          </section>
          
          {/* Getting Started Section */}
          <section id="getting-started" className="mb-20 max-w-4xl mx-auto scroll-mt-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-coder-purple mb-2">
                  <Book className="h-5 w-5" />
                  <span className="text-sm font-medium">CHAPTER 1</span>
                </div>
                
                <h2 className="text-3xl font-bold">Getting Started</h2>
                
                <p className="text-gray-300">
                  The Password Manager is a web-based tool designed to help you create 
                  strong, unique passwords for your online accounts. It's completely free to use 
                  and works directly in your browser without requiring any installation.
                </p>
                
                <p className="text-gray-300">
                  To start using the password manager, simply navigate to the homepage and 
                  scroll down to the password generator tool. The tool is ready to use immediately 
                  and will generate a secure password with the default settings.
                </p>
              </div>
              
              <div className="bg-secondary rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                  alt="Person using laptop with code visible on screen" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>
          
          {/* Generating Passwords Section */}
          <section id="generating-passwords" className="mb-20 max-w-4xl mx-auto scroll-mt-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-secondary rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                  alt="Person using password manager on laptop" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="space-y-6 order-1 md:order-2">
                <div className="inline-flex items-center gap-2 text-coder-purple mb-2">
                  <Key className="h-5 w-5" />
                  <span className="text-sm font-medium">CHAPTER 2</span>
                </div>
                
                <h2 className="text-3xl font-bold">Generating Secure Passwords</h2>
                
                <p className="text-gray-300">
                  Follow these steps to generate a secure password using our tool:
                </p>
                
                <ol className="space-y-4 text-gray-300 list-decimal list-inside">
                  <li className="pl-2">
                    <span className="font-medium">Adjust password length</span>: Use the slider to set the desired length. 
                    We recommend at least 12 characters for a secure password.
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Select character types</span>: Choose which character types to include 
                    (uppercase letters, lowercase letters, numbers, and special characters).
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Generate password</span>: Click the "Generate New Password" button to create a new password.
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Copy your password</span>: Click the copy icon to copy the password to your clipboard.
                  </li>
                </ol>
                
                <p className="text-gray-300">
                  You can generate as many passwords as you need. Each new password is completely random and secure.
                </p>
              </div>
            </div>
          </section>
          
          {/* Password Strength Section */}
          <section id="password-strength" className="mb-20 max-w-4xl mx-auto scroll-mt-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-coder-purple mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">CHAPTER 3</span>
                </div>
                
                <h2 className="text-3xl font-bold">Understanding Password Strength</h2>
                
                <p className="text-gray-300">
                  The password strength indicator gives you immediate feedback on how secure your generated password is:
                </p>
                
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-16 h-4 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <span className="font-medium">Weak</span>: This password is vulnerable to brute force attacks 
                      and should not be used for important accounts.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-16 h-4 bg-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <span className="font-medium">Medium</span>: This password offers moderate protection but could 
                      be improved by increasing length or complexity.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-16 h-4 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <span className="font-medium">Strong</span>: This password provides good protection against 
                      various password cracking methods.
                    </div>
                  </li>
                </ul>
                
                <p className="text-gray-300">
                  For the strongest passwords, use a combination of all character types and 
                  a length of at least 16 characters.
                </p>
              </div>
              
              <div className="bg-secondary rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                  alt="Computer with security software" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>
          
          {/* Best Practices Section */}
          <section id="best-practices" className="mb-20 max-w-4xl mx-auto scroll-mt-28">
            <div>
              <div className="inline-flex items-center gap-2 text-coder-purple mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">CHAPTER 4</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-8">Password Security Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="card-border bg-secondary p-6">
                  <h3 className="text-xl font-bold mb-3">Use Unique Passwords</h3>
                  <p className="text-gray-300">
                    Never reuse passwords across different accounts. If one service is compromised, 
                    all your accounts with the same password are at risk.
                  </p>
                </Card>
                
                <Card className="card-border bg-secondary p-6">
                  <h3 className="text-xl font-bold mb-3">Enable 2FA</h3>
                  <p className="text-gray-300">
                    Whenever possible, enable two-factor authentication on your accounts for an additional 
                    layer of security beyond just passwords.
                  </p>
                </Card>
                
                <Card className="card-border bg-secondary p-6">
                  <h3 className="text-xl font-bold mb-3">Regular Updates</h3>
                  <p className="text-gray-300">
                    Change your passwords periodically, especially for your most sensitive accounts 
                    like email and banking.
                  </p>
                </Card>
                
                <Card className="card-border bg-secondary p-6">
                  <h3 className="text-xl font-bold mb-3">Avoid Personal Information</h3>
                  <p className="text-gray-300">
                    Don't use easily guessable information in your passwords, such as birthdays, 
                    names of family members, or pets.
                  </p>
                </Card>
                
                <Card className="card-border bg-secondary p-6">
                  <h3 className="text-xl font-bold mb-3">Use a Password Manager</h3>
                  <p className="text-gray-300">
                    Consider using a dedicated password manager application to securely store all your 
                    passwords in an encrypted format.
                  </p>
                </Card>
                
                <Card className="card-border bg-secondary p-6">
                  <h3 className="text-xl font-bold mb-3">Check for Breaches</h3>
                  <p className="text-gray-300">
                    Periodically check if your accounts have been involved in data breaches using 
                    services like Have I Been Pwned.
                  </p>
                </Card>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section id="faq" className="mb-16 max-w-4xl mx-auto scroll-mt-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              <Card className="card-border bg-secondary p-6">
                <h3 className="text-xl font-bold mb-2">Are my passwords stored anywhere?</h3>
                <p className="text-gray-300">
                  No. All password generation happens in your browser. Nothing is transmitted or stored on any server. 
                  Once you navigate away from the page, the generated passwords are gone unless you've copied them.
                </p>
              </Card>
              
              <Card className="card-border bg-secondary p-6">
                <h3 className="text-xl font-bold mb-2">How secure are the generated passwords?</h3>
                <p className="text-gray-300">
                  The passwords are generated using cryptographically secure random algorithms. With sufficient length 
                  and character variety, they are designed to be resistant to brute force attacks.
                </p>
              </Card>
              
              <Card className="card-border bg-secondary p-6">
                <h3 className="text-xl font-bold mb-2">Can I save my passwords in this tool?</h3>
                <p className="text-gray-300">
                  No, this is only a password generator, not a storage tool. For storing passwords, 
                  we recommend using a dedicated password manager application like Bitwarden, 1Password, or LastPass.
                </p>
              </Card>
              
              <Card className="card-border bg-secondary p-6">
                <h3 className="text-xl font-bold mb-2">How can I contribute to this project?</h3>
                <p className="text-gray-300">
                  If you find this tool useful, you can support its development by buying me a coffee through 
                  the donation link. If you're a developer, you can also contribute to the code on GitHub.
                </p>
                
                <div className="mt-4">
                  <Link to="/donate">
                    <Button variant="outline" className="border-coder-purple text-coder-purple hover:bg-coder-purple hover:text-white">
                      <Coffee className="mr-2 h-4 w-4" />
                      Support This Project
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </section>
          
          {/* Return to Tool */}
          <div className="text-center mb-8">
            <Link to="/#password-tool">
              <Button className="bg-coder-purple hover:bg-coder-blue transition-colors">
                <RefreshCw className="mr-2 h-4 w-4" />
                Return to Password Generator
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Guide;
