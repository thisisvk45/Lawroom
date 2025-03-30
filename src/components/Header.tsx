
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-lawai-primary">Lawroom AI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium text-gray-600 hover:text-lawai-primary transition-colors">
            Home
          </Link>
          <Link to="/chat" className="font-medium text-gray-600 hover:text-lawai-primary transition-colors">
            Legal AI Chat
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.instagram.com/lawroomai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-lawai-primary transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://x.com/lawroomai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-lawai-primary transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="https://in.linkedin.com/company/lawroomai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-lawai-primary transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <Link to="/chat">
            <Button className="bg-lawai-primary hover:bg-lawai-primary/90 text-white">
              Try Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
