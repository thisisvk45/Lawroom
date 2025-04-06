import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRef, useEffect } from "react";

const Index = () => {
  const testimonialRef = useRef(null);

  useEffect(() => {
    const scrollContainer = testimonialRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // When a testimonial completely exits the view, move it to the end
      if (scrollPosition >= scrollContainer.children[0].offsetWidth) {
        scrollPosition = 0;
        // Move the first element to the end
        const firstItem = scrollContainer.children[0];
        scrollContainer.appendChild(firstItem.cloneNode(true));
        scrollContainer.removeChild(firstItem);
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause animation when user hovers
    scrollContainer.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animationId);
    });

    scrollContainer.addEventListener('mouseleave', () => {
      animationId = requestAnimationFrame(scroll);
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lawai-primary to-lawai-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl mb-6 md:text-4xl font-semibold">
                  Indian Legal Research and Services, Reimagined with AI
                </h1>
                <p className="text-lg mb-8">
                  Get instant, accurate answers to your legal questions. Lawroom AI is built specifically for Indian law, making legal research faster and more accessible.
                </p>
                <Link to="/chat">
                  <Button className="bg-pink-200 hover:bg-pink-300 text-lawai-primary text-lg font-medium px-8 py-6">
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
                    <ul>
                      <li>The matter must concern public interest</li>
                      <li>You can file under Article 32 (SC) or Article 226 (HC)</li>
                      <li>No formal requirements for locus standi</li>
                      <li>Simple letter/petition is sufficient</li>
                      <li>Court filing fees are minimal</li>
                    </ul>
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

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-lawai-primary mb-2">500+</div>
                <div className="text-gray-600">Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lawai-primary mb-2">20+</div>
                <div className="text-gray-600">Law Advisors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lawai-primary mb-2">25+</div>
                <div className="text-gray-600">States</div>
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

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-lawai-primary">
              What Our Users Say
            </h2>
            
            {/* Testimonials with Marquee Effect */}
            <div className="relative overflow-hidden">
              {/* Gradient Overlay - Left */}
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-100 to-transparent"></div>
              
              {/* Scrolling Testimonials Container */}
              <div 
                ref={testimonialRef}
                className="flex overflow-x-auto pb-6 no-scrollbar" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* We duplicate testimonials to create continuous effect */}
                {[...Array(2)].flatMap((_, outerIdx) => (
                  [
                    {
                      name: "Amit Sharma",
                      role: "Senior Advocate",
                      feedback:
                        "Lawroom AI saved me hours of legal research! It's incredibly accurate and easy to use.",
                    },
                    {
                      name: "Priya Mehta",
                      role: "Law Student",
                      feedback:
                        "As a law student, Lawroom AI has made my studies a lot easier. It provides clear and concise answers.",
                    },
                    {
                      name: "Ravi Verma",
                      role: "Corporate Lawyer",
                      feedback:
                        "I can rely on Lawroom AI for up-to-date legal info and case references for my practice.",
                    },
                    {
                      name: "Deepika Agarwal",
                      role: "Legal Researcher",
                      feedback:
                        "As a researcher, Lawroom AI has become my go-to tool for quick, reliable legal insights.",
                    },
                    {
                      name: "Vikas Joshi",
                      role: "Litigation Lawyer",
                      feedback:
                        "This AI platform is excellent for legal professionals, offering highly accurate results!",
                    },
                    {
                      name: "Sanjay Reddy",
                      role: "Law Graduate",
                      feedback:
                        "With Lawroom AI, I can find relevant case studies in seconds. It's a game-changer.",
                    },
                    {
                      name: "Ananya Sharma",
                      role: "Public Policy Expert",
                      feedback:
                        "Lawroom AI has helped me stay ahead in my legal career by providing the best research resources.",
                    },
                  ].map((testimonial, idx) => (
                    <div
                      key={`${outerIdx}-${idx}`}
                      className={`flex-shrink-0 w-72 mx-3 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-xl text-lawai-primary mr-2">"</span>
                        <p className="text-gray-700 italic">{testimonial.feedback}</p>
                        <span className="text-xl text-lawai-primary ml-2">"</span>
                      </div>
                      <div className="font-bold text-lawai-primary">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  ))
                ))}
              </div>
              
              {/* Gradient Overlay - Right */}
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-100 to-transparent"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
