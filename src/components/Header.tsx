import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Linkedin, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-lawai-deepTeal to-lawai-coral bg-clip-text text-transparent">
            Lawroom AI
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-lawai-teal transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop navigation with continuous gradient */}
        <div className="hidden md:flex items-center space-x-6 bg-gradient-to-r from-lawai-deepTeal to-lawai-coral bg-clip-text text-transparent">
          <Link
            to="/"
            className="font-medium bg-clip-text text-transparent"
          >
            Home
          </Link>
          <Link
            to="/chat"
            className="font-medium bg-clip-text text-transparent"
          >
            Legal AI Chat
          </Link>
          <a
            href="https://remarkable-kashata-783e16.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium bg-clip-text text-transparent"
          >
            Smart Drafting
          </a>
          <Link
            to="/upcoming-features"
            className="font-medium bg-clip-text text-transparent"
          >
            Upcoming Features
          </Link>
        </div>

        {/* Desktop social links and CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://www.instagram.com/lawroomai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-lawai-teal transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://x.com/lawroomai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-lawai-teal transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://in.linkedin.com/company/lawroomai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-lawai-teal transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <Link to="/chat">
            <Button className="bg-lawai-teal hover:bg-lawai-deepTeal text-white">
              Try Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="font-medium text-gray-600 hover:bg-gradient-to-r hover:from-lawai-deepTeal hover:to-lawai-coral hover:bg-clip-text hover:text-transparent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className="font-medium text-gray-600 hover:bg-gradient-to-r hover:from-lawai-deepTeal hover:to-lawai-coral hover:bg-clip-text hover:text-transparent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Legal AI Chat
            </Link>
            <a
              href="https://chatgpt.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-600 hover:bg-gradient-to-r hover:from-lawai-deepTeal hover:to-lawai-coral hover:bg-clip-text hover:text-transparent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Smart Drafting
            </a>
            <Link
              to="/upcoming-features"
              className="font-medium text-gray-600 hover:bg-gradient-to-r hover:from-lawai-deepTeal hover:to-lawai-coral hover:bg-clip-text hover:text-transparent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Upcoming Features
            </Link>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.instagram.com/lawroomai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-lawai-teal transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/lawroomai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-lawai-teal transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://in.linkedin.com/company/lawroomai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-lawai-teal transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-lawai-teal hover:bg-lawai-deepTeal text-white">
                Try Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
