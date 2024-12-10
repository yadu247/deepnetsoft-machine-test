import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="text-2xl font-bold">DEEPNETSOFT</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-400">
            HOME
          </Link>
          <Link to="/menu" className="hover:text-gray-400">
            MENU
          </Link>
          <Link to="/reservation" className="hover:text-gray-400">
            MAKE A RESERVATION
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            CONTACT US
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden relative top-0 left-0 w-full bg-gray-800 p-4 transition-all duration-300 transform z-20 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </Link>
          <Link
            to="/menu"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            MENU
          </Link>
          <Link
            to="/reservation"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            MAKE A RESERVATION
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT US
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
