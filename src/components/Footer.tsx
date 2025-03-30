
import { Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lawai-primary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Lawroom AI</h2>
            <p className="mb-4">
              Leveraging artificial intelligence to transform legal research for Indian law. 
              Get instant, accurate answers to your legal questions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/lawroomai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-lawai-secondary transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://x.com/lawroomai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-lawai-secondary transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="https://in.linkedin.com/company/lawroomai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-lawai-secondary transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-lawai-secondary transition-colors">Home</a></li>
              <li><a href="/chat" className="hover:text-lawai-secondary transition-colors">Legal AI Chat</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="mb-2">Have questions or feedback?</p>
            <p className="mb-2">Email: contact@lawroomai.com</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Lawroom AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
