import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, Mail } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    // Update page title
    document.title = "404 - Page Not Found | Glam By Harini";

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "The page you're looking for doesn't exist. Let's help you find what you need!");

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://glambyharini.in/404');
  }, []);

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <AlertCircle className="h-16 w-16 text-red-500" />
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>

              <p className="text-lg text-gray-600 mb-8">
                Sorry, the page you're looking for doesn't exist. It may have been moved or removed.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Link href="/" className="inline-block">
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold py-3 px-6 rounded-lg transition">
                    <Home className="h-5 w-5" />
                    Back to Home
                  </button>
                </Link>

                <Link href="/#services" className="inline-block">
                  <button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                    <span>Browse Services</span>
                  </button>
                </Link>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Still having trouble finding what you need?
              </p>
              <Link href="/#contact" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold">
                <Mail className="h-5 w-5" />
                Contact Us
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
