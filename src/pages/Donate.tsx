
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Coffee, Heart, CreditCard, Check } from 'lucide-react';

const Donate = () => {
  const [amount, setAmount] = useState('5');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you for your support!');
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  const presetAmounts = ['3', '5', '10', '25', 'custom'];

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="mb-16 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-coder-purple bg-opacity-20 mb-4">
              <Coffee className="h-6 w-6 text-coder-purple" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Support This Project</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your contribution helps keep this tool free, secure, and continuously improving.
            </p>
          </header>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Support Form */}
            <Card className="card-border bg-secondary p-6 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Buy Me a Coffee</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="amount">Select an amount</Label>
                  <RadioGroup 
                    value={amount} 
                    onValueChange={setAmount}
                    className="grid grid-cols-3 sm:grid-cols-5 gap-3"
                  >
                    {presetAmounts.map((preset) => (
                      <div key={preset}>
                        <RadioGroupItem
                          value={preset}
                          id={`amount-${preset}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`amount-${preset}`}
                          className="flex flex-col items-center justify-center border rounded-md border-gray-700 p-3 cursor-pointer peer-data-[state=checked]:border-coder-purple peer-data-[state=checked]:text-coder-purple hover:bg-gray-800 transition-all"
                        >
                          {preset === 'custom' ? (
                            'Custom'
                          ) : (
                            <>${preset}</>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {amount === 'custom' && (
                  <div className="space-y-3">
                    <Label htmlFor="customAmount">Enter custom amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="customAmount"
                        type="number"
                        min="1"
                        step="1"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="pl-7"
                        placeholder="Enter amount"
                        required={amount === 'custom'}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                  <p className="text-xs text-gray-400">
                    Only needed if you want to receive a thank you email.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="message">Message (optional)</Label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message or feedback"
                    className="w-full min-h-[100px] rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-coder-purple hover:bg-coder-blue transition-colors"
                  disabled={isSubmitting || (amount === 'custom' && !customAmount)}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Support Now
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-400">
                  Secure payment processing. Your payment information is never stored on our servers.
                </p>
              </form>
            </Card>
            
            {/* Support Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Why Support?</h3>
                <p className="text-gray-300">
                  This Password Manager tool was created to provide everyone with free access to 
                  a secure way to generate strong passwords. Your support helps to:
                </p>
                
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Keep the tool completely free and accessible to everyone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Fund ongoing maintenance and security updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Enable the development of new security features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Cover hosting and domain costs</span>
                  </li>
                </ul>
              </div>
              
              <Card className="card-border bg-secondary p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">From the Creator</h3>
                    <p className="text-gray-300 text-sm">
                      "Thank you for using my password manager tool! As a developer passionate about security, 
                      I created this tool to help everyone protect their digital lives. Your support, whether financial 
                      or simply spreading the word, means the world to me and helps keep this project alive."
                    </p>
                  </div>
                </div>
              </Card>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Other Ways to Support</h3>
                <p className="text-gray-300">
                  Don't want to contribute financially? You can still help by:
                </p>
                
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Sharing this tool with friends and colleagues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Providing feedback or suggestions for improvement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Contributing code or documentation if you're a developer</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Donate;
