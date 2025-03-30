
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, FileText, BookText, Brain } from 'lucide-react';

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  comingSoon = true 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode,
  comingSoon?: boolean
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-lawai-teal/10 p-3 rounded-lg mr-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-lawai-primary">{title}</h3>
          {comingSoon && (
            <span className="ml-4 bg-lawai-coral/10 text-lawai-coral text-xs font-semibold px-2.5 py-0.5 rounded">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const UpcomingFeatures = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-lawai-deepTeal to-lawai-teal py-20 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Upcoming Features
            </h1>
            <p className="text-lg text-center max-w-3xl mx-auto">
              Discover the innovative tools we're building to revolutionize legal research and assistance in India. Our AI-powered solutions are designed to make legal information more accessible and understandable.
            </p>
          </div>
        </section>
        
        <section className="py-16 container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All Features</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
              <TabsTrigger value="assistance">Assistance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  title="Legal Voice AI Agent" 
                  description="Interact with our AI using voice commands. Ask legal questions and get spoken answers using natural language processing."
                  icon={<Mic className="text-lawai-teal" size={24} />}
                />
                <FeatureCard 
                  title="Legal AI Summarizer" 
                  description="Upload legal documents and get concise summaries. Save hours of reading time with AI-generated document abstracts."
                  icon={<FileText className="text-lawai-coral" size={24} />}
                />
                <FeatureCard 
                  title="Legal Text Simplifier" 
                  description="Convert complex legal jargon into plain, easy-to-understand language for non-legal professionals."
                  icon={<BookText className="text-lawai-deepTeal" size={24} />}
                />
                <FeatureCard 
                  title="Precedent Case Finder" 
                  description="Quickly identify relevant case precedents based on your specific legal situation or requirements."
                  icon={<Brain className="text-lawai-deepCoral" size={24} />}
                />
                <FeatureCard 
                  title="Legal Document Generator" 
                  description="Create customized legal documents with guided assistance from our AI, ensuring accuracy and compliance."
                  icon={<FileText className="text-lawai-teal" size={24} />}
                />
                <FeatureCard 
                  title="Statute Change Tracker" 
                  description="Stay updated with changes in Indian laws and statutes with automated notifications and summaries."
                  icon={<BookText className="text-lawai-coral" size={24} />}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="research" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  title="Precedent Case Finder" 
                  description="Quickly identify relevant case precedents based on your specific legal situation or requirements."
                  icon={<Brain className="text-lawai-deepCoral" size={24} />}
                />
                <FeatureCard 
                  title="Statute Change Tracker" 
                  description="Stay updated with changes in Indian laws and statutes with automated notifications and summaries."
                  icon={<BookText className="text-lawai-coral" size={24} />}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="productivity" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  title="Legal AI Summarizer" 
                  description="Upload legal documents and get concise summaries. Save hours of reading time with AI-generated document abstracts."
                  icon={<FileText className="text-lawai-coral" size={24} />}
                />
                <FeatureCard 
                  title="Legal Document Generator" 
                  description="Create customized legal documents with guided assistance from our AI, ensuring accuracy and compliance."
                  icon={<FileText className="text-lawai-teal" size={24} />}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="assistance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  title="Legal Voice AI Agent" 
                  description="Interact with our AI using voice commands. Ask legal questions and get spoken answers using natural language processing."
                  icon={<Mic className="text-lawai-teal" size={24} />}
                />
                <FeatureCard 
                  title="Legal Text Simplifier" 
                  description="Convert complex legal jargon into plain, easy-to-understand language for non-legal professionals."
                  icon={<BookText className="text-lawai-deepTeal" size={24} />}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4 text-lawai-primary">Have a Feature Request?</h2>
            <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
              We're constantly improving our platform based on user feedback. If you have an idea for a new feature that would make your legal research easier, we'd love to hear from you!
            </p>
            <a 
              href="mailto:contact@lawroomai.com" 
              className="inline-flex items-center bg-lawai-teal hover:bg-lawai-deepTeal text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Share Your Idea
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UpcomingFeatures;
