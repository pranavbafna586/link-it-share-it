
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Share files <span className="text-brandpurple-600">effortlessly</span> with anyone
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Upload your files, share them with a simple link, and let anyone download them — no account required.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-brandpurple-600 hover:bg-brandpurple-700 w-full sm:w-auto">
                    Get Started for Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Log in
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  No credit card required · Free plan available
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brandpurple-100 to-brandpurple-50 rounded-xl transform rotate-3"></div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Dashboard preview" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Simple file sharing for everyone</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to share files with colleagues, clients, or friends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brandpurple-100 rounded-lg flex items-center justify-center mb-5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6 text-brandpurple-600"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Uploads</h3>
              <p className="text-gray-600">
                Drag and drop any file to upload instantly. We support all file types up to 2GB per file.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brandpurple-100 rounded-lg flex items-center justify-center mb-5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6 text-brandpurple-600"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Sharing</h3>
              <p className="text-gray-600">
                Generate shareable links instantly and send them to anyone, no account needed to download.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brandpurple-100 rounded-lg flex items-center justify-center mb-5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6 text-brandpurple-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Storage</h3>
              <p className="text-gray-600">
                All files are encrypted and stored securely. Control access with expiration dates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial/CTA Section */}
      <section className="bg-brandpurple-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
            <blockquote className="mb-8">
              <p className="text-2xl font-medium text-gray-700 mb-6">
                "link-it-share-it has completely transformed how our team shares files with clients. It's so simple that anyone can use it without training."
              </p>
              <footer className="flex items-center justify-center">
                <div className="flex-shrink-0">
                  <img 
                    className="h-10 w-10 rounded-full" 
                    src="https://randomuser.me/api/portraits/women/42.jpg" 
                    alt="Sarah Thompson" 
                  />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-lg font-medium">Sarah Thompson</p>
                  <p className="text-gray-500">Marketing Director, Acme Co.</p>
                </div>
              </footer>
            </blockquote>
            
            <div className="pt-6">
              <Link to="/signup">
                <Button size="lg" className="bg-brandpurple-600 hover:bg-brandpurple-700">
                  Start Sharing Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">About</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Contact</a>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-gray-500 text-sm">
                &copy; 2025 link-it-share-it. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
