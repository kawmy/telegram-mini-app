import React, { useState, useRef } from "react";

import "./ShoeCard.css"; // Import the CSS for the design
import "./Header.css"; // Import the CSS for the design
import "./Footer.css"; // Import the CSS for the design
import "./Modal.css"; // Import the CSS for the design

import shoeImage from "../images/shoe.png";
import jordan1 from "../images/jordan1.png";
import jordan2 from "../images/jordan2.png";
import jordan3 from "../images/jordan3.png";
import jordan4 from "../images/jordan4.png";

// Define the images for each dot
const dotImages = [
  { name: "Shoe", imgSrc: shoeImage },
  { name: "Jordan 1", imgSrc: jordan1 },
  { name: "Jordan 2", imgSrc: jordan2 },
  { name: "Jordan 3", imgSrc: jordan3 },
  { name: "Jordan 4", imgSrc: jordan4 },
];

const ShoeCard = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active dot index
  const [direction, setDirection] = useState("next"); // Track direction of transition
  const scrollContainerRef = useRef(null); // Reference for scrollable dot container

  const scrollToDot = (index) => {
    const scrollContainer = scrollContainerRef.current;
    const selectedDot = scrollContainer.children[index];
    selectedDot.scrollIntoView({
      behavior: "smooth",
      inline: "center", // Ensure the dot is centered in the view
    });
  };

  const handleNext = () => {
    setDirection("next");
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === dotImages.length - 1 ? 0 : prevIndex + 1;
      scrollToDot(newIndex); // Scroll to the new active dot
      return newIndex;
    });
  };

  const handlePrev = () => {
    setDirection("prev");
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? dotImages.length - 1 : prevIndex - 1;
      scrollToDot(newIndex); // Scroll to the new active dot
      return newIndex;
    });
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="quantity">
            <span>Quantity</span>
          </div>
          <div className="category">
            <span>Shoes</span>
          </div>
          <div className="username">
            <span>SHOP</span>
          </div>
        </div>

        <div className="main">
          <div className="prev-arrow" onClick={handlePrev}></div>
          <div className="prev-text" onClick={handlePrev}>
            Prev
          </div>
          {/* Holder behind the shoe */}
          <div className="holder-wrapper">
            <div className="shoe-holder"></div>
            {/* Display the active image based on the active dot */}
            {dotImages.map((dot, index) => (
              <img
                key={index}
                src={dot.imgSrc}
                alt={dot.name}
                className={`shoe-image ${
                  index === activeIndex ? `${direction} active` : ""
                }`} // Apply the active and direction-based classes
              />
            ))}
          </div>
          <div className="next-arrow" onClick={handleNext}></div>
          <div className="next-text" onClick={handleNext}>
            Next
          </div>
        </div>

        <div className="footer">
          <div className="scroll-container" ref={scrollContainerRef}>
            {/* Render dots and overlay the respective image */}
            {dotImages.map((dot, index) => (
              <div
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""}`} // Highlight the active dot
                onClick={() => {
                  setActiveIndex(index);
                  scrollToDot(index); // Scroll to the selected dot
                }}
              >
                <img src={dot.imgSrc} alt={dot.name} className="dot-overlay" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoeCard;
