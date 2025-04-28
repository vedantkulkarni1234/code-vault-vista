
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy, RefreshCw } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Generate password on component mount and when settings change
  useEffect(() => {
    generatePassword();
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  // Calculate password strength
  useEffect(() => {
    calculatePasswordStrength();
  }, [password]);

  const calculatePasswordStrength = () => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    
    // Character type checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Normalize to 0-100
    const normalizedStrength = Math.min(Math.max(Math.floor(strength * 14.3), 0), 100);
    setPasswordStrength(normalizedStrength);
  };

  const generatePassword = () => {
    // Make sure at least one character type is selected
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
      setUseLowercase(true);
    }
    
    let charset = '';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
    
    if (useUppercase) charset += uppercaseChars;
    if (useLowercase) charset += lowercaseChars;
    if (useNumbers) charset += numberChars;
    if (useSymbols) charset += symbolChars;
    
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        toast.success('Password copied to clipboard!');
      },
      (err) => {
        toast.error('Failed to copy password');
        console.error('Could not copy text: ', err);
      }
    );
  };

  const getStrengthColor = () => {
    if (passwordStrength < 33) return 'bg-red-500';
    if (passwordStrength < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 33) return 'Weak';
    if (passwordStrength < 66) return 'Medium';
    return 'Strong';
  };

  return (
    <Card className="card-border w-full max-w-lg mx-auto bg-secondary p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-glow text-coder-purple">Password Generator</h2>
      
      <div className="relative mb-4">
        <div 
          className="code-snippet p-3 flex justify-between items-center overflow-x-auto overflow-y-hidden"
        >
          <span className="font-mono text-lg whitespace-nowrap overflow-hidden text-ellipsis">
            {password}
          </span>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={generatePassword}
              className="hover:text-coder-purple"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={copyToClipboard}
              className="hover:text-coder-purple"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Password Strength:</span>
            <span>{getStrengthLabel()}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div 
              className={`h-full rounded-full transition-all ${getStrengthColor()}`}
              style={{ width: `${passwordStrength}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mt-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Password Length: {length}</span>
          </div>
          <Slider
            value={[length]}
            min={4}
            max={32}
            step={1}
            onValueChange={(values) => setLength(values[0])}
            className="my-4"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <label htmlFor="uppercase" className="text-sm font-medium">
              Uppercase Letters (A-Z)
            </label>
            <Switch 
              id="uppercase" 
              checked={useUppercase}
              onCheckedChange={setUseUppercase}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="lowercase" className="text-sm font-medium">
              Lowercase Letters (a-z)
            </label>
            <Switch 
              id="lowercase" 
              checked={useLowercase}
              onCheckedChange={setUseLowercase}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="numbers" className="text-sm font-medium">
              Numbers (0-9)
            </label>
            <Switch 
              id="numbers" 
              checked={useNumbers}
              onCheckedChange={setUseNumbers}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="symbols" className="text-sm font-medium">
              Special Characters (!@#$%)
            </label>
            <Switch 
              id="symbols" 
              checked={useSymbols}
              onCheckedChange={setUseSymbols}
            />
          </div>
        </div>
        
        <Button 
          onClick={generatePassword}
          className="w-full mt-4 bg-coder-purple hover:bg-coder-blue transition-colors"
        >
          Generate New Password
        </Button>
      </div>
    </Card>
  );
};

export default PasswordGenerator;
