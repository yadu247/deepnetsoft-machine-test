import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="lg:flex lg:items-end lg:justify-between bg-navbarBg text-navbarText lg:h-24">
      <div className="w-full px-4 sm:px-6 lg:px-32 flex items-center justify-between h-16 ">
        <div className="relative z-10 flex items-center justify-center mt-16">
          <img
            src="/logo.png"
            alt="Deepnetsoft Logo"
            className="w-14 h-14 object-cover"
          />

          <div className="hidden md:block lg:block ml-2">
            <div className="text-xl">
              <span className="text-navbarActive">DEEP</span> NET
            </div>
            <div className="text-xl text-logoAsh">SOFT</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 ">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-navbarActive' : '')}
          >
            HOME
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => (isActive ? 'text-navbarActive' : '')}
          >
            MENU
          </NavLink>
          <NavLink
            to="/reservation"
            className={({ isActive }) => (isActive ? 'text-navbarActive' : '')}
          >
            MAKE A RESERVATION
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'text-navbarActive' : '')}
          >
            CONTACT US
          </NavLink>
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-navbarActive block px-4 py-2' : 'block px-4 py-2'
            }
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive ? 'text-navbarActive block px-4 py-2' : 'block px-4 py-2'
            }
            onClick={() => setIsMenuOpen(false)}
          >
            MENU
          </NavLink>
          <NavLink
            to="/reservation"
            className={({ isActive }) =>
              isActive ? 'text-navbarActive block px-4 py-2' : 'block px-4 py-2'
            }
            onClick={() => setIsMenuOpen(false)}
          >
            MAKE A RESERVATION
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-navbarActive block px-4 py-2' : 'block px-4 py-2'
            }
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT US
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
