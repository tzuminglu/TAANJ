import React, { useState, useEffect } from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when user scrolls down
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
        >
          <ArrowUpwardIcon />
        </button>
      )}
    </>
  );
}

export default BackToTopButton;
