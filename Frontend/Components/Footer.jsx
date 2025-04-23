const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white px-6 py-10 mt-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#48AAF5]">GoFIND-WORLD 🌍</h2>
            <p className="text-sm text-gray-400">
              Explore countries, cultures, and facts around the globe in one immersive map experience.
            </p>
          </div>
  
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">Quick Links</h3>
            <ul className="text-gray-400 space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">Resources</h3>
            <ul className="text-gray-400 space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">API Access</a></li>
              <li><a href="#" className="hover:text-white">Terms & Privacy</a></li>
            </ul>
          </div>
  
          {/* Social */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-[#48AAF5]">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="hover:text-[#48AAF5]">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="hover:text-[#48AAF5]">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="hover:text-[#48AAF5]">
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
        </div>
  
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} GoFIND-WORLD. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  