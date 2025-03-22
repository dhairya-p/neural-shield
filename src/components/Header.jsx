import React from 'react';
import { Shield, Menu } from 'lucide-react';

function Header() {
  return (
    <div className="bg-white text-black p-4 shadow-lg border-b-4 border-orange-500">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <Shield className="text-orange-500" size={28} />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">NeuralShield</h1>
            <p className="text-xs text-gray-600">Security DNA Analysis Platform</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">About</a>
          <a href="#" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">Documentation</a>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md">
            Start Scan
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800">
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}

export default Header;