import React, { useEffect, useState } from "react";
import photos from "../assets/images"; // Import the images index

const RandomPopup = () => {
  const [visibleImages, setVisibleImages] = useState([]); // Array of currently visible images

  // Function to show multiple random images
  const showRandomImages = () => {
    const newImages = [];
    const imageCount = 3; // Number of images to show at once

    for (let i = 0; i < imageCount; i++) {
      const randomKey = `photo${Math.floor(Math.random() * 31) + 1}`; // Random image key
      const randomX = Math.random() * (window.innerWidth - 150); // Random X position
      const randomY = Math.random() * (window.innerHeight - 150); // Random Y position

      newImages.push({
        src: photos[randomKey],
        position: { top: randomY, left: randomX },
      });
    }

    setVisibleImages(newImages);
  };

  useEffect(() => {
    const interval = setInterval(showRandomImages, 5000); // Show new images every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      {visibleImages.map((image, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: image.position.top,
            left: image.position.left,
            zIndex: 1000,
            transition: "opacity 0.8s ease, transform 0.8s ease",
            opacity: 1, // Start fully visible
            transform: "scale(1)", // Normal size
          }}
          className="fade" // Apply the fade class
        >
          <img
            src={image.src}
            alt="Random Pop-Up"
            style={{
              maxWidth: "150px", // Set max width to limit size
              height: "auto", // Maintain aspect ratio
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }} // Increase size and add styles
          />
        </div>
      ))}
    </>
  );
};

export default RandomPopup;
