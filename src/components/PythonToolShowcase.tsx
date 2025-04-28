
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PythonToolShowcase = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    // This is where you'll add the actual download logic
    toast({
      title: "Download Started",
      description: "Your download should begin shortly.",
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Python GUI Password Manager
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get our desktop application for a more integrated password management experience. 
            Built with Python for performance and security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <Card className="card-border bg-secondary p-6 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-6 w-6 text-coder-purple" />
                Desktop Application
              </CardTitle>
              <CardDescription>
                A powerful Python GUI tool for managing your passwords offline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-6">
                  <pre className="text-sm text-coder-purple overflow-x-auto">
                    <code>
{`# Secure Password Management
import tkinter as tk
from cryptography.fernet import Fernet

class PasswordManager:
    def __init__(self):
        self.key = Fernet.generate_key()
        # ... more secure code`}
                    </code>
                  </pre>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="font-medium text-lg">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Offline password storage</li>
                    <li>Strong encryption</li>
                    <li>Cross-platform compatibility</li>
                    <li>User-friendly interface</li>
                  </ul>
                </div>
                <Button 
                  onClick={handleDownload}
                  className="w-full bg-coder-purple hover:bg-coder-blue transition-colors"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download for Desktop
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="relative h-[400px] parallax" data-speed="0.1">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-md glass-card p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="bg-black/40 p-4 rounded-lg mb-4">
                  <div className="flex gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-coder-purple/20 rounded w-3/4"></div>
                    <div className="h-4 bg-coder-purple/20 rounded w-1/2"></div>
                    <div className="h-4 bg-coder-purple/20 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-coder-purple/20 rounded w-1/3"></div>
                    <div className="h-6 bg-coder-purple/20 rounded w-1/4"></div>
                  </div>
                  <div className="h-10 bg-coder-purple/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PythonToolShowcase;
