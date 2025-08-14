import { Link } from "wouter";
import { Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white border-b border-enterprise-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" data-testid="link-home">
                <h1 className="text-2xl font-bold text-enterprise-800 cursor-pointer flex items-center">
                  <Building2 className="text-blue-600 mr-3 h-8 w-8" />
                  SCE Architecture
                </h1>
              </Link>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" data-testid="link-dashboard">
              <span className="text-enterprise-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Dashboard
              </span>
            </Link>
            <a href="#" className="text-enterprise-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Tools
            </a>
            <a href="#" className="text-enterprise-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Documentation
            </a>
            <a href="#" className="text-enterprise-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Support
            </a>
          </nav>
          <div className="flex items-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
