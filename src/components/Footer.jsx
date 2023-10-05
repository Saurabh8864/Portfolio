import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Set showFooter to true when the user reaches the last portion of the page
      if (scrollY + windowHeight >= documentHeight - 900) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer
      className={`bg-gray-800 text-white p-4 fixed bottom-0 w-full ${
        showFooter ? '' : 'hidden'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4">
          {/* Add your social links here */}
        </div>
        <p className="text-center mt-4">
          &copy; {new Date().getFullYear()} Your Website Name
        </p>
      </div>
    </footer>
  );
};

export default Footer;

