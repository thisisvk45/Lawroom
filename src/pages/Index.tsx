
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lawai-primary to-lawai-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Indian Legal Research, Reimagined with AI
                </h1>
                <p className="text-lg mb-8">
                  Get instant, accurate answers to your legal questions. Lawroom AI is built specifically for Indian law, making legal research faster and more accessible.
                </p>
                <Link to="/chat">
                  <Button className="bg-lawai-secondary hover:bg-lawai-secondary/90 text-lawai-primary text-lg font-medium px-8 py-6">
                    Start Legal Research
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="bg-white p-6 rounded-xl shadow-xl">
                  <div className="border-b pb-4 flex items-center mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <div className="ml-2 text-lawai-primary font-medium">Lawroom AI Chat</div>
                  </div>
                  <div className="chat-bubble-user mb-4">
                    What are the requirements for filing a PIL in India?
                  </div>
                  <div className="chat-bubble-ai">
                    In India, a Public Interest Litigation (PIL) can be filed by any citizen before the Supreme Court or High Courts. The key requirements are:
                    
                    1. The matter must concern public interest
                    2. You can file under Article 32 (SC) or Article 226 (HC)
                    3. No formal requirements for locus standi
                    4. Simple letter/petition is sufficient
                    5. Court filing fees are minimal
                    
                    Would you like more specific details on the procedure?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-lawai-primary">How Lawroom AI Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="rounded-full bg-lawai-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-lawai-primary text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-lawai-primary">Ask Your Question</h3>
                <p className="text-gray-600">
                  Simply type your legal query in natural language. Ask about any area of Indian law.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="rounded-full bg-lawai-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-lawai-primary text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-lawai-primary">AI Research</h3>
                <p className="text-gray-600">
                  Our AI analyses thousands of legal documents, cases, and statutes to find relevant information.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="rounded-full bg-lawai-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-lawai-primary text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-lawai-primary">Get Clear Answers</h3>
                <p className="text-gray-600">
                  Receive concise, accurate answers with references to relevant laws and cases.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-lawai-primary">Why Choose Lawroom AI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-lawai-primary">For Legal Professionals</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-lawai-primary rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Save hours of research time</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-lawai-primary rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Access comprehensive case law database</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-lawai-primary rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Stay updated with latest legal developments</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-lawai-primary">For Law Students</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-lawai-primary rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Learn complex legal concepts quickly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-lawai-primary rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Prepare more effectively for exams</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-lawai-primary rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Find relevant case studies instantly</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/chat">
                <Button className="bg-lawai-primary hover:bg-lawai-primary/90 text-white">
                  Start Using Lawroom AI
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
