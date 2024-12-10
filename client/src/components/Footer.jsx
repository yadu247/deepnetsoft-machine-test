import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-lg">
          &copy; 2024 DEEPNETSOFT Inc. All rights reserved.
        </p>
        <p className="mt-2">
          Address: First floor, Geo infopark, Infopark EXPY, Kakkanad
        </p>
        <p className="mt-1">
          Contact us:{' '}
          <a
            href="mailto:info@deepnetsoft.com"
            className="text-blue-400 hover:text-blue-600"
          >
            info@deepnetsoft.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
