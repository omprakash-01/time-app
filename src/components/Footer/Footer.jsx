import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-6xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8 bg-gray-50 rounded-lg shadow-lg mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-sm text-black sm:text-base">
            © {currentYear} tentwenty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
