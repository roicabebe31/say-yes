import React, { useEffect, useState } from "react";
import photos from "../assets/images";
import PropTypes from "prop-types";

const RandomPopup = ({ visibleImages, setVisibleImages, loadedPhotos }) => {
  const showRandomImages = () => {
    const newImages = [];
    const imageCount = 3;
    const imageWidth = 200;
    const imageHeight = 200;

    for (let i = 0; i < imageCount; i++) {
      const randomKey = `photo${Math.floor(Math.random() * 31) + 1}`;

      // Ensure the random positions do not exceed the screen dimensions
      const randomX = Math.random() * (window.innerWidth - imageWidth);
      const randomY = Math.random() * (window.innerHeight - imageHeight);

      newImages.push({
        src: photos[randomKey],
        position: { top: randomY, left: randomX },
      });
    }

    setVisibleImages(newImages);
  };

  useEffect(() => {
    if (loadedPhotos.length > 0) {
      const interval = setInterval(showRandomImages, 5000);
      return () => clearInterval(interval);
    }
  }, [loadedPhotos]);

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
            opacity: 1,
            transform: "scale(1)",
          }}
          className="fade"
        >
          <img
            src={image.src}
            alt="Random Pop-Up"
            style={{
              maxWidth: "150px",
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      ))}
    </>
  );
};

RandomPopup.propTypes = {
  visibleImages: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      position: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setVisibleImages: PropTypes.func.isRequired,
  loadedPhotos: PropTypes.array.isRequired,
};

export default RandomPopup;
