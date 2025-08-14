export function Footer() {
  return (
    <footer className="bg-white border-t border-enterprise-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="text-enterprise-600 text-sm">
            © 2024 SCE Architecture. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-enterprise-600 hover:text-blue-600 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-enterprise-600 hover:text-blue-600 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-enterprise-600 hover:text-blue-600 text-sm">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
